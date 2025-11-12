import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/api/rate-limit';
import { sendContactNotification } from '@/lib/email/resend-client';

/**
 * Contact form validation schema
 * Must match the client-side schema in ContactForm.tsx
 */
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono inválido').optional().or(z.literal('')),
  service: z.string().min(1, 'Por favor selecciona un servicio'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * POST /api/contact
 * Handle contact form submissions
 * 
 * @param request - Next.js request object
 * @returns JSON response with success status or error message
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    console.log(`[API /contact] Request from IP: ${ip}`);

    // 2. Check rate limit (10 requests per hour per IP)
    if (!checkRateLimit(ip)) {
      console.warn(`[API /contact] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { 
          error: 'Demasiados intentos. Por favor intenta de nuevo en 1 hora.',
          code: 'RATE_LIMIT_EXCEEDED' 
        },
        { status: 429 }
      );
    }

    // 3. Parse and validate request body
    const body = await request.json();
    const validatedData: ContactFormData = contactSchema.parse(body);

    console.log(`[API /contact] Valid submission from: ${validatedData.email}`);

    // 4. Send email notification
    const emailResult = await sendContactNotification({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || undefined,
      service: validatedData.service,
      message: validatedData.message,
    });

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        message: emailResult.dev 
          ? 'Mensaje recibido (modo desarrollo)'
          : 'Mensaje enviado correctamente. Te contactaremos pronto.',
        ...(emailResult.messageId && { messageId: emailResult.messageId }),
        ...(emailResult.dev && { dev: true }),
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('[API /contact] Error processing request:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      console.error('[API /contact] Validation errors:', error.issues);
      return NextResponse.json(
        {
          error: 'Los datos enviados no son válidos',
          code: 'VALIDATION_ERROR',
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: 'El formato de los datos no es válido',
          code: 'INVALID_JSON',
        },
        { status: 400 }
      );
    }

    // Handle generic errors
    return NextResponse.json(
      {
        error: 'Error al procesar tu solicitud. Por favor intenta de nuevo.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Return API status and documentation
 */
export async function GET() {
  return NextResponse.json({
    status: 'operational',
    endpoint: '/api/contact',
    methods: ['POST'],
    description: 'Contact form submission endpoint',
    rateLimit: {
      maxRequests: 10,
      windowMs: 3600000, // 1 hour
    },
    requiredFields: ['name', 'email', 'service', 'message'],
    optionalFields: ['phone'],
    documentation: '/specs/api/email-integration.md',
  });
}
