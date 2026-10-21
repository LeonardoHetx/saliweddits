import { STORY_HEADER } from "@/content/story";
import { Founder } from "@/sections/story/Founder";
import { StoryIntro } from "@/sections/story/StoryIntro";
import { Container } from "@/ui/Container";
import { SectionTitle } from "@/ui/SectionTitle";

/** OUR STORY — o estúdio e a Aline, num bloco só. Em B2B, quem edita é parte da venda. */
export function OurStory() {
  return (
    <section id="our-story" className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionTitle title={STORY_HEADER.title} script={STORY_HEADER.script} />
      </Container>
      <StoryIntro />
      <Founder />
    </section>
  );
}
