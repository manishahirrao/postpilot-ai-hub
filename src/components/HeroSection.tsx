import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OrbitLogo } from "./OrbitLogo";
import { Rocket } from "lucide-react";
import { ComplexOrbitalSystem } from "./OrbitalSystem";
import PageSection from "./Layout/PageSection";
import Animated from "./Layout/Animated";

export function HeroSection() {
  return (
    <PageSection className="relative min-h-screen hero-gradient flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Complex multi-layer orbital system */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ComplexOrbitalSystem className="w-96 h-96 opacity-30" />
        </div>
        
        {/* Secondary orbital systems with dynamic movement */}
        <motion.div 
          className="absolute top-20 right-32 w-48 h-48"
          animate={{
            rotate: -360,
            x: [0, 30, 0, -30, 0],
            y: [0, -15, 0, 15, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ComplexOrbitalSystem className="opacity-20" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-20 w-32 h-32"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ComplexOrbitalSystem className="opacity-25" />
        </motion.div>
        
        {/* Complex orbital paths for floating elements */}
        <motion.div 
          className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          animate={{
            x: [100, 200, 300, 200, 100],
            y: [100, 50, 100, 150, 100],
            scale: [1, 1.5, 1, 1.5, 1],
            opacity: [0.6, 1, 0.6, 1, 0.6],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div 
          className="absolute w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
          animate={{
            x: [300, 200, 100, 200, 300],
            y: [300, 250, 300, 350, 300],
            scale: [1, 1.3, 1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        <motion.div 
          className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full"
          animate={{
            x: [150, 250, 350, 250, 150],
            y: [200, 100, 200, 300, 200],
            scale: [1, 1.4, 1, 1.4, 1],
            opacity: [0.4, 0.9, 0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        <motion.div 
          className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
          animate={{
            x: [50, 150, 250, 150, 50],
            y: [400, 350, 400, 450, 400],
            scale: [1, 2, 1, 2, 1],
            opacity: [0.3, 0.8, 0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Energy pulse waves */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-cyan-500/10 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-purple-500/10 rounded-full"
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.2, 0, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeOut",
            delay: 3,
          }}
        />
      </div>

      <PageSection className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <Animated className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <Animated className="space-y-8">
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full px-4 py-2 border border-cyan-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium">Empowering Professional Success</span>
            </motion.div>

            <Animated as="h1" className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block">AI-Powered Tools for</span>
              <span className="block gradient-text">Career Success</span>
              <span className="block">& Professional Growth</span>
              <span className="block text-3xl lg:text-4xl font-normal opacity-80 mt-4">Create Content, Build Your Brand, Land Your Dream Job</span>
            </Animated>

            <Animated as="p" className="text-xl opacity-80 max-w-2xl">
              Accelerate your career with AI-powered tools designed specifically for job seekers and professionals. Create compelling content, build powerful resumes, and stand out in today's competitive market.
            </Animated>

            {/* Stats */}
            <Animated className="flex flex-wrap gap-8 text-center lg:text-left">
              {[
                { number: "50K+", label: "Professionals" },
                { number: "2M+", label: "Posts Generated" },
                { number: "95%", label: "Success Rate" }
              ].map((stat, index) => (
                <Animated key={stat.label} transition={{ delay: 0.2 + index * 0.1 }}>
                  <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                  <div className="text-sm opacity-60">{stat.label}</div>
                </Animated>
              ))}
            </Animated>

            {/* CTA Buttons */}
            <Animated className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-semibold">
                <a href="/auth/login/personal">Get Started Free</a>
              </Button>
              <Button asChild variant="outline" className="glass-morphism text-foreground px-8 py-4 text-lg hover:bg-background/20 transition-all font-semibold">
                <a href="/products">View Tools</a>
              </Button>
            </Animated>
          </Animated>

          {/* Hero Visual */}
          <Animated className="relative">
            <OrbitLogo size="lg" className="mx-auto" />
          </Animated>
        </Animated>
      </PageSection>
    </PageSection>
  );
}
