import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, Check, Star, Zap, Crown, ShieldCheck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: { monthly: 0, annual: 0 },
    description: 'For individuals starting out.',
    features: [
      '5 AI post generations per month',
      'Basic resume analysis',
      'Community support',
    ],
    cta: 'Get Started for Free',
    ctaLink: '/auth/register',
    popular: false,
  },
  {
    name: 'Professional',
    icon: Star,
    price: { monthly: 29, annual: 24 },
    description: 'For professionals aiming higher.',
    features: [
      'Unlimited AI post generations',
      'Advanced resume & CV builder',
      'AI-powered job matching',
      'Career analytics dashboard',
      'Priority email support',
    ],
    cta: 'Start 7-Day Free Trial',
    ctaLink: '/auth/register',
    popular: true,
  },
  {
    name: 'Business',
    icon: Crown,
    price: { monthly: 99, annual: 79 },
    description: 'For teams and small companies.',
    features: [
      'Everything in Professional',
      'Team collaboration tools',
      'Advanced team analytics',
      'Dedicated success manager',
      'Custom branding',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact-sales',
    popular: false,
  },
];

const faqItems = [
  {
    question: 'Can I upgrade or downgrade my plan later?',
    answer: 'Absolutely. You can change your plan at any time from your account settings. The new billing cycle will start immediately.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Google Pay.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes, our Professional plan comes with a 7-day free trial, giving you full access to all its features without any commitment.',
  },
  {
    question: 'What happens if I exceed my usage limits on the Free plan?',
    answer: 'If you reach your monthly generation limit, you can either upgrade to the Professional plan for unlimited access or wait until the next month for your quota to reset.',
  },
];

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4">Simple & Transparent Pricing</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Find the Perfect Plan</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Whether you're just starting or scaling your professional brand, we have a plan that fits your needs.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className={`font-medium ${!isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>Monthly</span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} aria-label="Toggle billing frequency" />
            <span className={`font-medium ${isAnnual ? 'text-primary' : 'text-muted-foreground'}`}>Annual</span>
            <Badge variant="secondary">Save 20%</Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary border-2' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-4 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <plan.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="text-center my-6">
                      <span className="text-4xl font-bold">${isAnnual ? plan.price.annual : plan.price.monthly}</span>
                      <span className="text-muted-foreground">{plan.price.monthly > 0 ? '/month' : ''}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild size="lg" className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    <Link to={plan.ctaLink}>{plan.cta} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-2">Your questions, answered.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="bg-background border rounded-lg p-8 md:p-12 text-center flex flex-col items-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">30-Day Money-Back Guarantee</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              We're confident you'll love PostPilot. If you're not satisfied within the first 30 days, we'll issue a full refund, no questions asked.
            </p>
            <Button asChild>
              <Link to="/auth/register">Get Started Risk-Free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
