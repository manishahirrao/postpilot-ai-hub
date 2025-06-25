
import * as React from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, Check, Star, Zap, Crown, Headphones } from 'lucide-react';

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started',
      features: [
        'Basic LinkedIn post drafts (5 per month)',
        'Resume enhancer beta',
        'Job search basics',
        'Community support',
        'Basic templates',
        'Email support'
      ],
      limitations: [
        'Limited AI generations',
        'Watermarked exports',
        'Basic analytics only'
      ],
      cta: 'Sign Up Free',
      ctaLink: '/auth/register',
      popular: false,
      gradient: 'from-blue-50 to-indigo-50'
    },
    {
      name: 'Professional',
      icon: <Star className="w-6 h-6 text-purple-600" />,
      price: { monthly: 29, annual: 24 },
      description: 'For serious professionals',
      features: [
        'Unlimited LinkedIn post generation',
        'Advanced resume builder/enhancer',
        'Job matcher with AI rankings',
        'Career analytics dashboard',
        'Priority email support',
        'Advanced templates',
        'Custom branding',
        'Export in multiple formats',
        'Content calendar',
        'Engagement analytics'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      ctaLink: '/auth/register',
      popular: true,
      gradient: 'from-purple-50 to-pink-50'
    },
    {
      name: 'Business',
      icon: <Crown className="w-6 h-6 text-orange-600" />,
      price: { monthly: 99, annual: 79 },
      description: 'For teams and companies',
      features: [
        'Everything in Professional',
        'AI video generation for company pages',
        'Advanced team analytics',
        'White-label options',
        'API access',
        'Dedicated customer success manager',
        'Custom integrations',
        'Advanced security features',
        'Team collaboration tools',
        'Bulk operations',
        'Custom training sessions',
        'Priority phone support'
      ],
      limitations: [],
      cta: 'Contact Sales',
      ctaLink: '/contact-sales',
      popular: false,
      gradient: 'from-orange-50 to-red-50'
    }
  ];

  const faq = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans.'
    }
  ];

  const savings = isAnnual ? 20 : 0;

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, Predictable
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the plan that fits your needs. Start free, upgrade when you're ready. 
            All plans include our core AI-powered features.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'ring-2 ring-purple-600 shadow-xl scale-105' : 'shadow-lg'} transition-all hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={`text-center bg-gradient-to-br ${plan.gradient} rounded-t-lg`}>
                  <div className="flex items-center justify-center mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <p className="text-gray-600">{plan.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-gray-600 ml-2">
                        {plan.price.monthly > 0 ? '/month' : ''}
                      </span>
                    </div>
                    {isAnnual && plan.price.monthly > 0 && (
                      <p className="text-sm text-gray-500 mt-2">
                        Billed annually (${plan.price.annual * 12}/year)
                      </p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-start space-x-3 opacity-60">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mx-auto mt-1.5"></div>
                        </div>
                        <span className="text-gray-600 text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={plan.ctaLink}>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : plan.name === 'Business'
                          ? 'bg-orange-600 hover:bg-orange-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                For enterprises with specific requirements, we offer custom pricing, 
                dedicated support, and tailored integrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact-sales">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                    <Headphones className="w-5 h-5 mr-2" />
                    Talk to Sales
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-indigo-600">
                  Schedule Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="space-y-8">
            {faq.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Money Back Guarantee */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            30-Day Money-Back Guarantee
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try PostPilot risk-free. If you're not completely satisfied within 30 days, 
            we'll refund your money, no questions asked.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to accelerate your career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start with our free plan and upgrade when you're ready for more features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact-sales">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
