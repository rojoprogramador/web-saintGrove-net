import { Resend } from 'resend';
import { ContactNotificationEmail, type ContactNotificationEmailProps } from './templates/ContactNotificationEmail';

/**
 * Configuration for email sending
 */
export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || 'SaintGrove <no-reply@saintgrove.net>',
  to: process.env.CONTACT_TO_EMAIL || 'contacto@saintgrove.net',
  subjectPrefix: 'Nuevo contacto: ',
} as const;

/**
 * Get or create Resend client instance (lazy initialization)
 * This prevents errors during build time when API key is not available
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

/**
 * Send a contact notification email
 * @param data - Contact form data
 * @returns Promise with the email send result
 */
export async function sendContactNotification(data: ContactNotificationEmailProps) {
  try {
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('[Resend] API key not configured. Running in dev mode.');
      console.log('[Resend] Email would be sent:', {
        to: EMAIL_CONFIG.to,
        subject: `${EMAIL_CONFIG.subjectPrefix}${data.service}`,
        data,
      });

      return {
        success: true,
        dev: true,
        message: 'Email logged in development mode',
      };
    }

    // Get Resend client
    const resend = getResendClient();
    if (!resend) {
      throw new Error('Failed to initialize Resend client');
    }

    // Send email using Resend
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.to,
      subject: `${EMAIL_CONFIG.subjectPrefix}${data.service}`,
      replyTo: data.email,
      react: ContactNotificationEmail(data),
    });

    if (result.error) {
      console.error('[Resend] Error sending email:', result.error);
      throw new Error(result.error.message || 'Failed to send email');
    }

    console.log('[Resend] Email sent successfully:', result.data?.id);

    return {
      success: true,
      messageId: result.data?.id,
      message: 'Email sent successfully',
    };
  } catch (error) {
    console.error('[Resend] Unexpected error:', error);
    throw error;
  }
}

/**
 * Test if Resend is properly configured
 */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Get Resend configuration status
 */
export function getResendStatus() {
  return {
    configured: isResendConfigured(),
    from: EMAIL_CONFIG.from,
    to: EMAIL_CONFIG.to,
  };
}
