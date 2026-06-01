import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResearchSection from "@/components/ResearchSection";
import GitHubSection from "@/components/GitHubSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ResearchSection />
      <GitHubSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
