import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Heading,
} from '@react-email/components';

export interface ContactNotificationEmailProps {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export const ContactNotificationEmail = ({
  name,
  email,
  phone,
  service,
  message,
}: ContactNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body className="bg-gray-50 font-sans">
        <Container className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg my-8">
          {/* Header con branding SaintGrove */}
          <Section className="bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-6 rounded-t-lg">
            <Heading className="text-white text-2xl font-bold m-0">
              Nuevo Contacto
            </Heading>
            <Text className="text-teal-100 text-sm mt-2 mb-0">
              Mensaje recibido desde SaintGrove.net
            </Text>
          </Section>

          {/* Contenido principal */}
          <Section className="px-8 py-6">
            {/* Servicio solicitado */}
            <Section className="bg-gray-50 rounded-lg p-4 mb-6">
              <Text className="text-gray-600 text-xs uppercase tracking-wide mb-1 mt-0">
                Servicio solicitado
              </Text>
              <Text className="text-gray-900 text-lg font-semibold m-0">
                {service}
              </Text>
            </Section>

            {/* Información de contacto */}
            <Section className="mb-6">
              <Heading className="text-gray-900 text-lg font-semibold mb-4 mt-0">
                Información de Contacto
              </Heading>

              <Section className="mb-3">
                <Text className="text-gray-600 text-xs uppercase tracking-wide mb-1 mt-0">
                  Nombre
                </Text>
                <Text className="text-gray-900 text-base m-0">
                  {name}
                </Text>
              </Section>

              <Section className="mb-3">
                <Text className="text-gray-600 text-xs uppercase tracking-wide mb-1 mt-0">
                  Email
                </Text>
                <Text className="text-teal-600 text-base m-0">
                  {email}
                </Text>
              </Section>

              {phone && (
                <Section className="mb-3">
                  <Text className="text-gray-600 text-xs uppercase tracking-wide mb-1 mt-0">
                    Teléfono
                  </Text>
                  <Text className="text-gray-900 text-base m-0">
                    {phone}
                  </Text>
                </Section>
              )}
            </Section>

            <Hr className="border-gray-200 my-6" />

            {/* Mensaje */}
            <Section>
              <Heading className="text-gray-900 text-lg font-semibold mb-3 mt-0">
                Mensaje
              </Heading>
              <Section className="bg-gray-50 rounded-lg p-4">
                <Text className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap m-0">
                  {message}
                </Text>
              </Section>
            </Section>
          </Section>

          {/* Footer */}
          <Section className="bg-gray-50 px-8 py-6 rounded-b-lg border-t border-gray-200">
            <Text className="text-gray-600 text-sm text-center m-0">
              Este mensaje fue enviado desde el formulario de contacto de{' '}
              <span className="font-semibold text-teal-600">SaintGrove.net</span>
            </Text>
            <Text className="text-gray-500 text-xs text-center mt-2 mb-0">
              Puedes responder directamente a este email para contactar al cliente.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactNotificationEmail;
