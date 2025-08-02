import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Star,
  TrendingUp,
  MessageSquare,
  Users,
  Award
} from 'lucide-react';

// Types
interface UseCase {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
  features: string[];
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  gradient: string;
  bgGradient?: string;
}

// Card Components
const UseCaseCard: React.FC<{ useCase: UseCase; index: number }> = ({ useCase, index }) => {
  const Icon = useCase.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm border border-white/10 ${useCase.bgGradient} hover:shadow-lg hover:shadow-${useCase.gradient.split(' ')[0].replace('from-', '')}/20 transition-all duration-300 h-full`}
    >
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${useCase.gradient} opacity-10 -z-10`} />
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-6`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
      <p className="text-gray-300 mb-4">{useCase.description}</p>
      <ul className="space-y-2 mt-4">
        {useCase.features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle className={`w-5 h-5 ${i % 2 === 0 ? 'text-cyan-400' : 'text-purple-400'} mr-2 mt-0.5 flex-shrink-0`} />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm border border-white/10 ${testimonial.bgGradient} bg-opacity-10 hover:shadow-lg hover:shadow-${testimonial.gradient.split(' ')[0].replace('from-', '')}/20 transition-all duration-300`}
    >
      <div className="flex items-start mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg mr-4 flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-white">{testimonial.author}</h4>
          <p className="text-sm text-gray-300">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>
      <div className={`relative ${!isExpanded ? 'max-h-24 overflow-hidden' : ''}`}>
        <p className="text-gray-200 italic">"{testimonial.quote}"</p>
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent flex items-end justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center"
            >
              Read more <ChevronDown className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>
      {isExpanded && (
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-sm text-blue-400 hover:text-blue-300 flex items-center mt-2"
        >
          Show less <ChevronUp className="w-4 h-4 ml-1" />
        </button>
      )}
      <div className="flex mt-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Reusable Section Components
const Section: React.FC<{ 
  id: string; 
  className?: string; 
  children: React.ReactNode 
}> = ({ id, className = '', children }) => (
  <section id={id} className={`relative overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {children}
    </div>
  </section>
);

const SectionHeader: React.FC<{ 
  title: string; 
  subtitle: string; 
  className?: string 
}> = ({ title, subtitle, className = '' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`max-w-3xl mx-auto text-center mb-12 ${className}`}
  >
    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4">
      {title}
    </h2>
    <p className="text-lg text-gray-400">{subtitle}</p>
  </motion.div>
);

// Background gradient component for the page
const BackgroundGradient = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <motion.div 
      className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 filter blur-3xl -top-48 -left-48"
      animate={{
        x: [0, 20, 0],
        y: [0, 20, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    <motion.div 
      className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 filter blur-3xl -bottom-48 -right-48"
      animate={{
        x: [0, -20, 0],
        y: [0, -20, 0],
        scale: [1, 1.2, 1]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  </div>
);

const professionalUseCases: UseCase[] = [
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Showcase your achievements, share industry insights, and attract recruiters for better job opportunities.",
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    features: [
      "Attract recruiters with optimized profiles",
      "Showcase career milestones",
      "Highlight key achievements"
    ]
  },
  {
    icon: MessageSquare,
    title: "Thought Leadership",
    description: "Establish yourself as a go-to expert by consistently posting valuable content and engaging with your network.",
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    features: [
      "Content strategy planning",
      "Industry insights sharing",
      "Engagement analytics"
    ]
  },
  {
    icon: Users,
    title: "Network Building",
    description: "Connect with professionals, mentors, and peers to expand your influence and open new doors.",
    gradient: "from-green-400 to-teal-500",
    bgGradient: "bg-gradient-to-br from-green-500/10 to-teal-500/10",
    features: [
      "Smart connection suggestions",
      "Engagement tracking",
      "Networking analytics"
    ]
  },
  {
    icon: Award,
    title: "Personal Branding",
    description: "Craft a memorable online presence that reflects your unique strengths and aspirations.",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
    features: [
      "Profile optimization",
      "Content personalization",
      "Brand consistency tools"
    ]
  }
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "This platform has transformed how I approach my career growth. The insights and tools provided are invaluable for professional development. The ability to track my progress and get personalized recommendations has been a game-changer for my career trajectory. I've received multiple job offers since optimizing my profile here.",
    author: "Sarah Johnson",
    role: "Senior UX Designer",
    company: "TechCorp",
    avatar: "SJ",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
  },
  {
    id: 2,
    quote: "As a hiring manager, I've seen firsthand how this platform helps candidates present their best selves. The difference in quality is remarkable. The structured approach to showcasing skills and achievements makes it much easier to identify top talent. We've reduced our hiring time by 40% since we started using this platform for recruitment.",
    author: "Michael Chen",
    role: "Talent Acquisition Lead",
    company: "InnovateX",
    avatar: "MC",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
  },
  {
    id: 3,
    quote: "The networking opportunities and thought leadership features have helped me connect with industry leaders and grow my professional circle significantly. The content recommendations are always on point, and I've been able to establish myself as a thought leader in my field. The analytics dashboard provides valuable insights into how my content performs.",
    author: "David Kim",
    role: "Product Manager",
    company: "Nexus Labs",
    avatar: "DK",
    rating: 4,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "bg-gradient-to-br from-amber-500/10 to-orange-500/10"
  },
  {
    id: 4,
    quote: "I was skeptical at first, but this platform has completely changed how I approach my personal brand. The guided process helped me identify my unique value proposition and communicate it effectively. I've been approached by recruiters from top companies and have successfully negotiated a 30% salary increase in my current role.",
    author: "Emily Rodriguez",
    role: "Marketing Director",
    company: "BrandForge",
    avatar: "ER",
    rating: 5,
    gradient: "from-green-500 to-teal-500",
    bgGradient: "bg-gradient-to-br from-green-500/10 to-teal-500/10"
  }
];

const UseCasesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <BackgroundGradient />
      
      {/* Hero Section */}
      <Section id="hero" className="pt-32 pb-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Unlock Your <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Professional Potential</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Discover how our platform can help you achieve your career goals and build meaningful connections through strategic professional development.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/solutions/why-us">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* Professional Use Cases */}
      <Section id="use-cases" className="relative z-10">
        <SectionHeader 
          title="Professional Use Cases" 
          subtitle="How we help you grow" 
          className="mb-16"
        />
        
        <div className="grid md:grid-cols-2 gap-8 px-4 sm:px-6">
          {professionalUseCases.map((useCase, index) => (
            <UseCaseCard key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" className="relative z-10">
        <SectionHeader 
          title="Success Stories" 
          subtitle="What our users say" 
          className="mb-16"
        />
        
        <div className="grid md:grid-cols-2 gap-8 px-4 sm:px-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" className="relative z-10 pb-24">
        <motion.div 
          className="relative overflow-hidden rounded-3xl p-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-4 sm:mx-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[calc(1.5rem-1px)] p-8 sm:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-6">
              Ready to Transform Your Professional Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have accelerated their careers with our platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/5">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
};

export default UseCasesPage;
