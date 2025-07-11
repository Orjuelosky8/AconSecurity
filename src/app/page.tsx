import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import ClientLogos from '@/components/landing/ClientLogos';
import AboutUs from '@/components/landing/AboutUs';
import Certifications from '@/components/landing/Certifications';
import Portfolio from '@/components/landing/Portfolio';
import Coverage from '@/components/landing/Coverage';
import TechSlider from '@/components/landing/TechSlider';
import SocialResponsibility from '@/components/landing/SocialResponsibility';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <ClientLogos />
        <AboutUs />
        <Certifications />
        <Portfolio />
        <Coverage />
        <TechSlider />
        <SocialResponsibility />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
