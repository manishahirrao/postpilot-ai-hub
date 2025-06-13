import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, X, Send, User, Bot, LifeBuoy, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  showTicketOption?: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI customer support assistant for PostPilot. I can help you understand our features, troubleshoot issues, answer questions about pricing and usage, and create support tickets if needed. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const websiteKnowledge = {
    platform: {
      name: "PostPilot",
      description: "An AI-powered SaaS platform that helps businesses automate workflows and improve customer experience through intelligent tools and automation.",
      mainFeatures: [
        "AI automation and workflow management",
        "24/7 AI-powered customer support",
        "Voice agents for phone support",
        "AI ads and creative generator"
      ]
    },
    products: {
      automations: {
        name: "Automations",
        description: "Streamline workflows, automate repetitive tasks, and boost productivity with email automation, task scheduling, and workflow management.",
        commonIssues: ["workflow not triggering", "automation setup", "integration problems"]
      },
      support: {
        name: "AI Support",
        description: "24/7 AI-powered customer support with multi-channel chat, contextual understanding, and seamless handover to human agents.",
        commonIssues: ["chat widget not loading", "responses not accurate", "handover to human agent"]
      },
      voiceAgents: {
        name: "Voice Agents",
        description: "Conversational AI for phone support with automated call handling and intelligent routing.",
        commonIssues: ["call quality issues", "agent not understanding", "routing problems"]
      },
      adsGenerator: {
        name: "Ads Generator",
        description: "AI-powered tool for creating personalized ad copy, dynamic banners, automated video ads, and A/B testing assets.",
        commonIssues: ["ads not generating", "low quality output", "customization options"]
      }
    },
    pricing: {
      structure: "Flexible pricing plans starting with a free tier",
      enterprise: "Custom enterprise solutions available",
      contact: "Contact sales team for detailed pricing information"
    },
    commonTroubleshooting: {
      login: "If you can't login, try resetting your password or clearing browser cache. Check if your account is verified.",
      toolNotWorking: "If tools aren't generating results, check your internet connection, try refreshing the page, or verify your subscription status.",
      slowPerformance: "For slow performance, try clearing browser cache, checking internet speed, or using a different browser.",
      integrationIssues: "For integration problems, verify API keys, check permissions, and ensure all required fields are configured."
    }
  };

  const getAIResponse = (userMessage: string): { response: string; needsTicket: boolean } => {
    const message = userMessage.toLowerCase();
    
    // Login and access issues
    if (message.includes('login') || message.includes('sign in') || message.includes('access') || message.includes('password')) {
      if (message.includes('can\'t') || message.includes('cannot') || message.includes('problem') || message.includes('issue')) {
        return {
          response: "I understand you're having trouble logging in. Here are some quick solutions: 1) Try resetting your password, 2) Clear your browser cache and cookies, 3) Make sure your account is verified. If these don't work, I can create a support ticket for you.",
          needsTicket: true
        };
      }
      return {
        response: "For login help, you can reset your password using the 'Forgot Password' link on the login page. Make sure your account is verified and try clearing your browser cache if you're still having issues.",
        needsTicket: false
      };
    }

    // Tool not working issues
    if ((message.includes('not working') || message.includes('not generating') || message.includes('broken') || message.includes('error')) && 
        (message.includes('tool') || message.includes('automation') || message.includes('ads') || message.includes('voice') || message.includes('support'))) {
      return {
        response: "I'm sorry to hear you're experiencing issues with our tools. Here are some troubleshooting steps: 1) Refresh the page, 2) Check your internet connection, 3) Verify your subscription status, 4) Try using a different browser. If the problem persists, I'd be happy to create a support ticket for our technical team.",
        needsTicket: true
      };
    }

    // Product-specific responses
    if (message.includes('automation') || message.includes('workflow')) {
      return {
        response: websiteKnowledge.products.automations.description + " Common issues include workflow triggers and integration setup. Are you experiencing any specific problems?",
        needsTicket: false
      };
    }
    if (message.includes('support') || message.includes('customer service')) {
      return {
        response: websiteKnowledge.products.support.description + " If you're having issues with the chat widget or need to speak with a human agent, I can help escalate that for you.",
        needsTicket: false
      };
    }
    if (message.includes('voice') || message.includes('agent') || message.includes('call')) {
      return {
        response: websiteKnowledge.products.voiceAgents.description + " Are you experiencing any call quality or routing issues?",
        needsTicket: false
      };
    }
    if (message.includes('ads') || message.includes('marketing') || message.includes('creative')) {
      return {
        response: websiteKnowledge.products.adsGenerator.description + " If your ads aren't generating or you're not satisfied with the output quality, I can help troubleshoot or escalate to our team.",
        needsTicket: false
      };
    }
    
    // Pricing inquiries
    if (message.includes('pricing') || message.includes('cost') || message.includes('price') || message.includes('plan')) {
      return {
        response: `Our pricing structure includes ${websiteKnowledge.pricing.structure}. We also offer ${websiteKnowledge.pricing.enterprise}. For detailed pricing information, I recommend contacting our sales team or I can create a ticket to have someone reach out to you.`,
        needsTicket: false
      };
    }

    // Features and capabilities
    if (message.includes('feature') || message.includes('what can') || message.includes('capabilities') || message.includes('what does')) {
      return {
        response: `PostPilot offers these main features: ${websiteKnowledge.platform.mainFeatures.join(', ')}. Which specific feature would you like to learn more about?`,
        needsTicket: false
      };
    }
    
    // Demo and trial requests
    if (message.includes('demo') || message.includes('trial') || message.includes('try') || message.includes('test')) {
      return {
        response: "I'd be happy to help you get started! You can sign up for a free trial on our homepage. For a personalized demo, I can create a ticket to have our sales team schedule one with you.",
        needsTicket: false
      };
    }

    // Contact and escalation requests
    if (message.includes('human') || message.includes('agent') || message.includes('speak to') || message.includes('talk to')) {
      return {
        response: "I understand you'd like to speak with a human agent. I can create a support ticket to connect you with the right team member. What's the main issue you need help with?",
        needsTicket: true
      };
    }
    
    // General dissatisfaction or need for escalation
    if (message.includes('not satisfied') || message.includes('doesn\'t help') || message.includes('not working') || message.includes('frustrated')) {
      return {
        response: "I'm sorry to hear that you're experiencing difficulties. I want to make sure you get the help you need. Let me create a support ticket so our specialized team can assist you directly.",
        needsTicket: true
      };
    }
    
    // Default response for unmatched queries
    return {
      response: "I'm here to help! Since this issue might need a human agent, would you like me to create a support ticket for you? Please provide more details about what you're trying to do or what problem you're experiencing.",
      needsTicket: true
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    console.log('Sending message:', inputMessage);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const { response, needsTicket } = getAIResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
        showTicketOption: needsTicket
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNotSatisfied = (messageId: string) => {
    setShowTicketForm(true);
  };

  const handleTicketSubmit = async () => {
    if (!ticketForm.name || !ticketForm.email || !ticketForm.subject || !ticketForm.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send to your backend
    console.log('Support ticket submitted:', ticketForm);
    
    toast({
      title: "Support Ticket Created",
      description: "Your support ticket has been submitted. Our team will get back to you within 24 hours."
    });

    setShowTicketForm(false);
    setTicketForm({ name: '', email: '', subject: '', description: '' });
    
    // Add confirmation message to chat
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      content: "Perfect! I've created a support ticket for you. Our human support team will reach out within 24 hours to provide specialized assistance. Is there anything else I can help you with in the meantime?",
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-14 h-14 shadow-lg gradient-primary text-white border-0 hover:scale-110 transition-transform"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] z-40 shadow-xl border-0 overflow-hidden flex flex-col">
          <CardHeader className="gradient-primary text-white p-4 flex-shrink-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5" />
              PostPilot Support Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex-1 flex flex-col min-h-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.isBot ? 'bg-gray-100 text-gray-900' : 'gradient-primary text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.showTicketOption && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 h-8 text-xs"
                          onClick={() => handleNotSatisfied(message.id)}
                        >
                          <LifeBuoy className="h-3 w-3 mr-1" />
                          Create Support Ticket
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="border-t p-4 flex-shrink-0 bg-white">
              <div className="flex gap-2 items-center">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  size="sm"
                  className="gradient-primary text-white border-0 flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support Ticket Modal */}
      <Dialog open={showTicketForm} onOpenChange={setShowTicketForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <LifeBuoy className="h-5 w-5" />
              Create Support Ticket
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={ticketForm.name}
                onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={ticketForm.email}
                onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@company.com"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={ticketForm.subject}
                onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={ticketForm.description}
                onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please provide detailed information about your inquiry or issue..."
                rows={4}
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowTicketForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleTicketSubmit}
                className="flex-1 gradient-primary text-white border-0"
              >
                Submit Ticket
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Chatbot;