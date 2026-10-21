import { Contact } from "@/sections/contact/Contact";
import { Faq } from "@/sections/contact/Faq";
import { Craft } from "@/sections/home/Craft";
import { Hero } from "@/sections/home/Hero";
import { Intro } from "@/sections/home/Intro";
import { Process } from "@/sections/home/Process";
import { Testimonials } from "@/sections/home/Testimonials";
import { WhatWeEdit } from "@/sections/home/WhatWeEdit";
import { Footer } from "@/sections/layout/Footer";
import { Header } from "@/sections/layout/Header";
import { PhotoStrip } from "@/sections/layout/PhotoStrip";
import { OurStory } from "@/sections/OurStory";
import { OurWork } from "@/sections/OurWork";

/**
 * Página única. O menu (Home · Our Work · Our Story · Contact) são âncoras.
 *
 * Narrativa: quem/o quê (Hero) → dor e promessa (Intro) → prova visual
 * (Our Work) → os formatos (What We Edit) → o ofício (Craft) → como funciona
 * (Process) → prova social (Testimonials) → as pessoas (Our Story) →
 * objeções (FAQ) → conversão (Contact: faixa + edit test).
 *
 * Superfícies — nunca duas iguais seguidas: noite → linho → papel → linho →
 * noite → papel → sálvia → linho → sálvia → papel → noite → papel → linho.
 */
export function Landing() {
  return (
    <>
      <Header />
      <main className="min-w-0">
        <Hero />
        <Intro />
        <OurWork />
        <WhatWeEdit />
        <Craft />
        <Process />
        <Testimonials />
        <OurStory />
        <Faq />
        <Contact />
      </main>
      <PhotoStrip />
      <Footer />
    </>
  );
}
