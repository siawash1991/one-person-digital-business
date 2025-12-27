import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { Curriculum } from "@/components/landing/Curriculum";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProblemSolution />
      <Curriculum />
    </div>
  );
};

export default Index;
