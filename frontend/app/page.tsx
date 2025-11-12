import { Header, Footer, WhatsAppFloat, SocialBar } from '@/components/layout';
import { Hero, Process, CTA } from '@/components/features/home';
import { ServicesGrid } from '@/components/features/services';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <Process />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
      <SocialBar />
    </>
  );
}
