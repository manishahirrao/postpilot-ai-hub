import { HeroSection } from "@/components/HeroSection";
import { TrustedBy } from "./TrustedBy";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialSection";
import { CTASection } from "@/components/CTASection";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <HeroSection />
      <TrustedBy />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer/>
    </div>
  );
}
