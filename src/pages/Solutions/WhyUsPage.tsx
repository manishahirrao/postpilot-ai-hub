import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Clock, 
  UserCheck, 
  CheckCircle,
  Star,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronUp,
  TrendingUp
} from 'lucide-react';

// Types
interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
  points: string[];
}

interface Stat {
  number: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  delay: number;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  gradient: string;
}

// Reusable Components
const Section: React.FC<{ id: string; className?: string; children: React.ReactNode }> = ({ 
  id, 
  className = '',
  children 
}) => (
  <section id={id} className={`relative overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {children}
    </div>
  </section>
);

const SectionHeader: React.FC<{ title: string; subtitle: string; className?: string }> = ({ 
  title, 
  subtitle, 
  className = '' 
}) => (
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

// Card Components
const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm border border-white/10 ${feature.bgGradient} hover:shadow-lg hover:shadow-${feature.gradient.split(' ')[0].replace('from-', '')}/20 transition-all duration-300`}
    >
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 -z-10`} />
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
      <p className="text-gray-300 mb-4">{feature.description}</p>
      <ul className="space-y-2">
        {feature.points.map((point, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle className={`w-5 h-5 ${i % 2 === 0 ? 'text-cyan-400' : 'text-purple-400'} mr-2 mt-0.5 flex-shrink-0`} />
            <span className="text-gray-300">{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const StatCard: React.FC<{ stat: Stat }> = ({ stat }) => {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: stat.delay, duration: 0.6 }}
      className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300"
    >
      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-2">
        {stat.number}
      </div>
      <div className="text-gray-400">{stat.label}</div>
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
      className={`relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm border border-white/10 bg-gradient-to-br ${testimonial.gradient} bg-opacity-10 hover:shadow-lg hover:shadow-${testimonial.gradient.split(' ')[0].replace('from-', '')}/20 transition-all duration-300`}
    >
      <div className="flex items-start mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg mr-4 flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-white">{testimonial.author}</h4>
          <p className="text-sm text-gray-300">{testimonial.role}</p>
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

// Background gradient component for the page
const BackgroundGradient: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-100" />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0dGVybiBpZD0icGF0dGVybi1iYXNlIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFucm9ybT0icm90YXRlKDEzNSkiPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNmZmZmZmYwMiIvPjwvcGF0dGVybj48L3N2Zz4=')] opacity-5" />
    
    {/* Animated gradient orbs */}
    <motion.div 
      className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 filter blur-3xl -top-32 -left-32"
      animate={{
        x: [0, 20, 0],
        y: [0, 20, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 15,
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


const features = [
  {
    icon: Zap,
    title: "AI-Powered Content",
    description: "Generate high-quality, engaging posts in seconds using our advanced AI technology.",
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    points: [
      "Tone Control & Style Options",
      "Length Settings & Customization",
      "Anecdote Integration & Personal Touch"
    ]
  },
  {
    icon: Clock,
    title: "Time-Saving",
    description: "Cut your content creation time by 80% and focus on what matters most.",
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    points: [
      "Quick Post Generation",
      "Batch Scheduling",
      "Content Calendar"
    ]
  },
  {
    icon: TrendingUp,
    title: "Grow Your Network",
    description: "Attract more connections and opportunities with optimized content.",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
    points: [
      "Engagement Analytics",
      "Follower Growth",
      "Networking Tools"
    ]
  },
  {
    icon: UserCheck,
    title: "Personal Branding",
    description: "Build a strong, consistent professional brand across all your content.",
    gradient: "from-green-400 to-teal-500",
    bgGradient: "bg-gradient-to-br from-green-500/10 to-teal-500/10",
    points: [
      "Brand Voice Consistency",
      "Content Strategy",
      "Profile Optimization"
    ]
  }
];

const stats = [
  { 
    number: '50,000+', 
    label: 'Professionals Empowered', 
    icon: Users,
    gradient: 'from-blue-400 to-cyan-400',
    delay: 0.1
  },
  { 
    number: '2M+', 
    label: 'Posts Created', 
    icon: MessageSquare,
    gradient: 'from-purple-400 to-pink-400',
    delay: 0.2
  },
  { 
    number: '10x', 
    label: 'More Engagement', 
    icon: TrendingUp,
    gradient: 'from-amber-400 to-orange-400',
    delay: 0.3
  },
  { 
    number: '4.9/5', 
    label: 'User Rating', 
    icon: Star,
    gradient: 'from-green-400 to-teal-400',
    delay: 0.4
  }
];

const testimonials: Testimonial[] = [
  {
    quote: "PostPilot transformed my LinkedIn presence. I went from 500 to 10,000+ followers in 6 months!",
    author: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "SJ",
    rating: 5,
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    quote: "The AI suggestions are incredibly accurate. I spend 80% less time creating content now.",
    author: "Michael Chen",
    role: "Tech Entrepreneur",
    avatar: "MC",
    rating: 5,
    gradient: 'from-purple-500/20 to-pink-500/20'
  },
  {
    quote: "Best investment in my professional development. The engagement on my posts has skyrocketed.",
    author: "Priya Patel",
    role: "Freelance Designer",
    avatar: "PP",
    rating: 5,
    gradient: 'from-amber-500/20 to-orange-500/20'
  }
];

const WhyUsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <BackgroundGradient />
      
      {/* Hero Section */}
      <Section id="hero" className="pt-32 pb-16">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100 mb-6"
          >
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">PostPilot</span>?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
          >
            Transform your LinkedIn presence with AI-powered content that gets you noticed by the right people.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white/30 hover:bg-white/10 hover:border-white/50"
              >
                Watch Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features" className="bg-gray-900/50 backdrop-blur-sm">
        <SectionHeader 
          title="Powerful Features" 
          subtitle="Everything you need to grow your professional presence" 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </Section>

      {/* Stats Section */}
      <Section id="stats" className="bg-gray-900/80 backdrop-blur-sm">
        <SectionHeader 
          title="Proven Results" 
          subtitle="Join thousands of professionals who trust PostPilot" 
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials" className="bg-gray-900/50 backdrop-blur-sm">
        <SectionHeader 
          title="Trusted by Professionals" 
          subtitle="See what our users have to say" 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" className="bg-gradient-to-br from-blue-900/50 to-purple-900/50">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Transform Your LinkedIn Presence?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-gray-300 mb-8"
          >
            Join thousands of professionals who are growing their network with AI-powered content.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white/30 hover:bg-white/10 hover:border-white/50"
              >
                Schedule a Demo
              </Button>
            </Link>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default WhyUsPage;
