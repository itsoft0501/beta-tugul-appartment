import Icons from '@/components/Icons';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Why from '@/components/Why';
import Quality from '@/components/Quality';
import Plans from '@/components/Plans';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollUI from '@/components/ScrollUI';
import { LightboxProvider } from '@/components/Lightbox';
import Reveal from '@/components/Reveal';

export default function Home() {
  return (
    <LightboxProvider>
      <Icons />
      <Header />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <Why />
        <Quality />
        <Plans />
        <Location />
        <Contact />
      </main>
      <Footer />
      <ScrollUI />
      <Reveal />
    </LightboxProvider>
  );
}
