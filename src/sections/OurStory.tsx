import { STORY_HEADER } from "@/content/story";
import { Founder } from "@/sections/story/Founder";
import { StoryIntro } from "@/sections/story/StoryIntro";
import { Container } from "@/ui/Container";
import { SectionTitle } from "@/ui/SectionTitle";

/**
 * OUR STORY — depois da prova (filmes, ofício, processo, depoimentos), as
 * pessoas: o estúdio e a Aline. Em B2B, quem edita é parte da venda.
 */
export function OurStory() {
  return (
    <div id="our-story">
      <section className="bg-linen pb-4 pt-20 sm:pt-28">
        <Container>
          <SectionTitle title={STORY_HEADER.title} script={STORY_HEADER.script} />
        </Container>
      </section>
      <StoryIntro />
      <Founder />
    </div>
  );
}
