import { motion } from "framer-motion";
import PageSection from "./Layout/PageSection";
import Animated from "./Layout/Animated";

const testimonials = [
  {
    quote: "The LinkedIn Post Generator made my job search 10x easier. I got more responses than ever before!",
    author: "Priya S.",
    role: "UX Designer",
    gradient: "from-orange-400 to-red-500"
  },
  {
    quote: "Resume enhancer gave me a clean, ATS-friendly format and great content tips that landed me interviews.",
    author: "Amit R.", 
    role: "Marketing Graduate",
    gradient: "from-blue-400 to-cyan-500"
  },
  {
    quote: "The hiring outsourcing service saved us weeks of time. We hired 3 people via the tool in just one month!",
    author: "Anika K.",
    role: "HR Manager at TalentHive", 
    gradient: "from-purple-400 to-pink-500"
  },
  {
    quote: "We now publish professional posts regularly without an agency. Huge time and cost saver for our startup.",
    author: "Raj M.",
    role: "Co-founder of WebRecruit", 
    gradient: "from-green-400 to-teal-500"
  }
];

export function TestimonialsSection() {
  return (
    <PageSection className="py-24 relative bg-transparent">
      <div className="absolute inset-0 hero-gradient -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/80 -z-10" />
      {/* Background orbital elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/2 left-10 w-40 h-40 border border-cyan-500/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/4 right-20 w-24 h-24 border border-purple-500/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10">
        <Animated className="text-center mb-16">
          <blockquote className="max-w-3xl mx-auto text-center text-2xl font-medium text-foreground/90 leading-relaxed bg-background/50 backdrop-blur-sm p-8 rounded-2xl border border-border/20 hover:border-primary/30 transition-all">
            <div className="relative">
              <svg className="absolute -top-6 -left-6 w-12 h-12 text-foreground/10" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.016 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.016 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.552-7.104 6.624-9.024L25.864 4z" />
              </svg>
              <span className="relative">
                What Our Users Say
              </span>
            </div>
          </blockquote>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Trusted by thousands of professionals and companies worldwide
          </p>
        </Animated>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Animated
              key={testimonial.author}
              className="p-6 rounded-xl bg-background/70 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all hover:shadow-xl hover:-translate-y-1 group"
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mt-2 text-muted-foreground/80 group-hover:text-foreground/80 transition-colors">Active Users</div>
              <motion.div 
                className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full mr-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <div className="mt-8">
                <div className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">{testimonial.author}</div>
                <div className="text-muted-foreground/80 group-hover:text-foreground/80 transition-colors">{testimonial.role}</div>
              </div>
              <Animated 
                as="p"
                className="opacity-80"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 0.8 } }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
              >
                "{testimonial.quote}"
              </Animated>
            </Animated>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
