import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageSection from "./Layout/PageSection";
import Animated from "./Layout/Animated";

export function CTASection() {
  return (
    <PageSection className="relative py-24">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/70 to-background/90" />
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 border border-cyan-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating elements */}
        <motion.div 
          className="absolute top-10 right-10 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 text-center">
        <Animated 
          as="h2" 
          className="text-4xl lg:text-5xl font-bold mb-6 text-foreground"
        >
          Ready to <span className="gradient-text">Accelerate</span> Your Career?
        </Animated>
        
        <Animated 
          as="p" 
          className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto"
          transition={{ delay: 0.2 }}
        >
          Join thousands of professionals who are using AI to land better jobs, create compelling content, and build their careers.
        </Animated>
        
        <Animated transition={{ delay: 0.4 }}>
          <Button size="lg" className="px-8 py-6 text-lg font-semibold group">
            <span className="relative z-10 group-hover:text-white transition-colors">Start Free Trial</span>
          </Button>
          <Button asChild variant="outline" className="glass-morphism text-foreground px-10 py-4 text-lg hover:bg-background/20 transition-all font-semibold">
            <a href="/products">Explore Tools</a>
          </Button>
        </Animated>
      </div>
    </PageSection>
  );
}
