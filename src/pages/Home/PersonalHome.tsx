
import { motion } from 'framer-motion';
import { 
  Rocket, 
  FileText, 
  Mic, 
  Linkedin, 
  BarChart3,
  Target,
  Play,
  Star,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: BarChart3,
    title: "Career Analytics & Tips",
    description: "Get instant benchmarks and personalized roadmaps to guide your career.",
  },
  {
    icon: Target,
    title: "Job Finder & Applier",
    description: "Utilize AI-powered search and match-scoring to find and apply for your dream job.",
  },
  {
    icon: FileText,
    title: "Resume & CV Builder",
    description: "Create custom, ATS-optimized resumes and CVs in just a few minutes.",
  },
  {
    icon: Mic,
    title: "Mock Interviews",
    description: "Practice with simulated behavioral and technical interviews to build confidence.",
  },
  {
    icon: Linkedin,
    title: "LinkedIn Content Generator",
    description: "Generate engaging posts and articles, then schedule them directly.",
  },
  {
    icon: Rocket,
    title: "Unified AI Interface",
    description: "Manage all your career-building activities from a single, intuitive chat window.",
  },
];

const testimonials = [
  {
    quote: "I landed my dream job in 2 weeks—thanks to the Job Finder Agent! ContentHelm made the search and application process incredibly efficient.",
    author: "Priya M.",
    role: "Software Engineer",
  },
  {
    quote: "The mock interviews were a game-changer. I went into my final rounds at Google with so much more confidence and it showed.",
    author: "Rahul S.",
    role: "Product Manager",
  },
  {
    quote: "My LinkedIn engagement has more than doubled since I started using the Content Generator. It's like having a personal marketing team.",
    author: "Anita K.",
    role: "Marketing Director",
  },
];

const HomePage = () => {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-4">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              AI-Powered Career Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Supercharge Your Career with AI
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Our suite of intelligent agents analyzes, optimizes, and propels your professional journey, all from one intuitive platform.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
              
              size="lg" asChild>
                <a href="/dashboard">Get Started <ArrowRight className="ml-2 h-4 w-4 " /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/demo"> <Play className="mr-2 h-4 w-4" /> Watch Demo</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Feature Highlights</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Powerful AI agents designed to accelerate every aspect of your career growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary/60 transition-colors duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by Professionals Worldwide</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Real stories from users who have transformed their careers with PostPilot.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col justify-between">
                  <CardContent className="pt-6">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                  </CardContent>
                  <div className="bg-muted/40 px-6 py-4">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ready to Accelerate Your Career?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of professionals who are taking control of their careers with AI-driven insights and tools. Get started today.
              </p>
              <Button size="lg" asChild>
                <a href="/auth/login">Start Your Free Trial <CheckCircle className="ml-2 h-4 w-4" /></a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;