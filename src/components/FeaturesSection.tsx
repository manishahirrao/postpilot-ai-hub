import { motion } from "framer-motion";
import { FileText, Users, TrendingUp, Star } from "lucide-react";
import PageSection from "./Layout/PageSection";
import Animated from "./Layout/Animated";

const features = [
  {
    icon: FileText,
    title: "Social Media Post Generator",
    description: "Create engaging posts with tone, style, and length controls. Rate suggestions and regenerate with personal anecdotes.",
    points: [
      "Tone Control & Style Options",
      "Length Settings & Customization", 
      "Anecdote Integration & Personal Touch"
    ],
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    icon: Users,
    title: "Resume Builder & Enhancer",
    description: "Build powerful resumes from scratch or enhance existing ones with AI-powered suggestions.",
    points: [
      "ATS-Friendly Format",
      "Content Enhancement & Optimization",
      "Skills Analysis & Template Library"
    ],
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: TrendingUp,
    title: "Career Analytics & Job Matching",
    description: "Get personalized insights and match your skills with relevant opportunities using advanced AI algorithms.",
    points: [
      "Smart Job Matching & Alerts",
      "Performance & Skill Gap Analysis",
      "Career Roadmap & Industry Insights"
    ],
    gradient: "from-green-500 to-teal-600"
  }
];

export function FeaturesSection() {
  return (
    <PageSection className="py-24 relative hero-gradient">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/80" />
      {/* Background orbital elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-10 w-32 h-32 border border-cyan-500/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-24 h-24 border border-purple-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10">
        <Animated className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">For Working Professionals</span>
            <span className="block">Accelerate Your Career with AI-Powered Tools</span>
          </h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Designed for job seekers and professionals to create content, build resumes, and advance careers
          </p>
        </Animated>

        {/* Feature Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Animated 
              key={feature.title} 
              className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-border/20 hover:border-primary/30 transition-all hover:shadow-2xl hover:-translate-y-1 group"
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground/90 mb-6">{feature.description}</p>
                
                <ul className="space-y-3">
                  {feature.points.map((point, pointIndex) => (
                    <li key={point} className="group/item">
                      <Animated
                        className="flex items-start space-x-3"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        transition={{ duration: 0.4, delay: index * 0.2 + pointIndex * 0.1 }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span className="text-foreground/90 text-sm group-hover/item:text-primary/90 transition-colors">{point}</span>
                      </Animated>
                    </li>
                  ))}
                </ul>
            </Animated>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
