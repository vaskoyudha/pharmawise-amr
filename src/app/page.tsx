import { FinalCTA } from "@/components/landing/FinalCTA";
import { FeatureTour } from "@/components/landing/FeatureTour";
import { Hero } from "@/components/landing/Hero";
import { JourneyTimeline } from "@/components/landing/JourneyTimeline";
import { ModulesGrid } from "@/components/landing/ModulesGrid";
import { PersonaStrip } from "@/components/landing/PersonaStrip";
import { RoleShowcase } from "@/components/landing/RoleShowcase";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 md:py-20">
      <Hero />
      <ScrollReveal animation="slideUp" delay={0.1}>
        <RoleShowcase />
      </ScrollReveal>
      <ScrollReveal animation="slideUp" delay={0.1}>
        <FeatureTour />
      </ScrollReveal>
      <ScrollReveal animation="slideUp" delay={0.1}>
        <PersonaStrip />
      </ScrollReveal>
      <ScrollReveal animation="slideUp" delay={0.1}>
        <JourneyTimeline />
      </ScrollReveal>
      <ScrollReveal animation="slideUp" delay={0.1}>
        <ModulesGrid />
      </ScrollReveal>
      <ScrollReveal animation="slideUp" delay={0.1}>
        <FinalCTA />
      </ScrollReveal>
    </main>
  );
}
