import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import OfferSection from '@/components/OfferSection';
import WhyUsSection from '@/components/WhyUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProcessSection from '@/components/ProcessSection';
import GallerySection from '@/components/GallerySection';
import FaqSection from '@/components/FaqSection';
import { faqs } from '@/data/faq';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import { useFadeIn } from '@/hooks/useFadeIn';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "GRANBET Zakład Kamieniarski Henryk Sobczuk",
  "description": "Zakład kamieniarski oferujący nagrobki granitowe, grobowce, fotoceramikę, schody i parapety. Tradycja od 1988 roku.",
  "telephone": "+48502480543",
  "email": "granbet@vp.pl",
  "url": "https://granbet.pl/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Hrubieszowska 33",
    "addressLocality": "Kryłów",
    "addressRegion": "lubelskie",
    "addressCountry": "PL"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "07:00", "closes": "15:00" }
  ],
  "foundingDate": "1988",
  "hasMap": "https://maps.google.com/?q=Krylow+ul.+Hrubieszowska+33+gmina+Mircze"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  // Pytania i odpowiedzi pochodzą z tego samego modułu co widoczna sekcja FAQ,
  // żeby dane strukturalne zawsze zgadzały się z treścią strony.
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a },
  })),
};

export default function Index() {
  useFadeIn();

  return (
    <HelmetProvider>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <OfferSection />
        <WhyUsSection />
        <TestimonialsSection />
        <ProcessSection />
        <GallerySection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection />
    </HelmetProvider>
  );
}
