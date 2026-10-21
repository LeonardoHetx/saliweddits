import { useRef } from "react";
import { STORY } from "@/content/story";
import { useParallax } from "@/lib/motion";
import { Container } from "@/ui/Container";
import { Photo } from "@/ui/Photo";
import { Reveal } from "@/ui/Reveal";

/** "A little about us": o estúdio, a crença e a parceria com o filmmaker. */
export function StoryIntro() {
  const img = useRef<HTMLDivElement>(null);
  useParallax(img, 10);

  return (
    <div className="pt-12 sm:pt-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-[2rem] leading-[1.2] sm:text-[2.6rem]">{STORY.title}</h2>
            <div className="mt-8 space-y-5 leading-relaxed text-ink-soft sm:text-lg">
              {STORY.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150} className="relative aspect-[4/5] overflow-hidden">
            <div ref={img} className="absolute -inset-y-[8%] inset-x-0">
              <Photo src={STORY.image} mono />
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-24 max-w-3xl border-y hairline py-14 text-center sm:mt-32">
          <p className="display text-2xl sm:text-4xl">{STORY.closing.lead}</p>
          <p className="script mt-2 text-[2.2rem] text-ink-soft sm:text-5xl">{STORY.closing.script}</p>
        </Reveal>
      </Container>
    </div>
  );
}
