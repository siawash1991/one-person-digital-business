import { Header } from '@/components/landing/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProof } from '@/components/landing/SocialProof';
import { ProblemSolution } from '@/components/landing/ProblemSolution';
import { Curriculum } from '@/components/landing/Curriculum';
import { FreeSession } from '@/components/landing/FreeSession';
import { Instructor } from '@/components/landing/Instructor';
import { Pricing } from '@/components/landing/Pricing';
import { Guarantee } from '@/components/landing/Guarantee';
import { FAQ } from '@/components/landing/FAQ';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { LandingFooter } from '@/components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <Header />
      <main>
        <HeroSection />
        <SocialProof />
        <ProblemSolution />
        <Curriculum />
        <FreeSession />
        <Instructor />
        <Pricing />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
