import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { Footer } from "@/sections/layout/Footer";
import { Header } from "@/sections/layout/Header";
import { OurStory } from "@/sections/OurStory";
import { OurWork } from "@/sections/OurWork";
import { Process } from "@/sections/Process";

/**
 * Página única. Menu: Home (Hero) · Our Work · Our Story · Contact; o How We
 * Work Together fica entre Our Work e Our Story (o que editamos → como →
 * quem). Superfícies alternam: noite → papel → linho → papel → linho → papel.
 */
export function Landing() {
  return (
    <>
      <Header />
      <main className="min-w-0">
        <Hero />
        <OurWork />
        <Process />
        <OurStory />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
