import { useState } from "react";
import { Twitter, Linkedin, Github, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import AgentOSLogo from "../Logo/logo";

const footerSections = [
  {
    title: 'Products',
    links: [
      { name: 'LinkedIn Post Builder', href: '/product/personal-post-generation' },
      { name: 'Resume Enhancer', href: '/product/resume-builder' },
      { name: 'Career Match', href: '/product/job-matcher' },
      { name: 'Mock Interview', href: '/product/mock-interview' },
      { name: 'Career Insights', href: '/product/career-analytics' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/about/careers' },
      { name: 'Leadership', href: '/about/management' },
      { name: 'Investors', href: '/about/investors' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Help Center', href: '/support' },
      { name: 'API Documentation', href: '/docs' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Instagram', href: '#', icon: Instagram },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setTimeout(() => setIsSubscribed(false), 5000);
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="border-t bg-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <AgentOSLogo />
              <span className="text-lg font-semibold text-foreground">PostPilot</span>
            </Link>
            <p className="text-muted-foreground">
              AI-powered tools for career growth and content creation.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild>
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-foreground">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} PostPilot. All rights reserved.
            </p>
            <div className="w-full max-w-sm">
              {isSubscribed ? (
                <p className="text-center text-sm text-green-600">
                  Thanks for subscribing!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Stay updated. Your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email for newsletter"
                  />
                  <Button type="submit" disabled={isLoading}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Subscribe</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}