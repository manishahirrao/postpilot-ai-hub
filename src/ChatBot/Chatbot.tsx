import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, LifeBuoy, CheckCircle, Sparkles, Zap, Clock } from 'lucide-react';

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        response: `${websiteKnowledge.products.automations.description} Common issues include workflow triggers and integration setup. Are you experiencing any specific problems?`,
        needsTicket: false
      };
    }
    if (message.includes('support') || message.includes('customer service')) {
      return {
        response: `${websiteKnowledge.products.support.description} If you're having issues with the chat widget or need to speak with a human agent, I can help escalate that for you.`,
        needsTicket: false
      };
    }
    if (message.includes('voice') || message.includes('agent') || message.includes('call')) {
      return {
        response: `${websiteKnowledge.products.voiceAgents.description} Are you experiencing any call quality or routing issues?`,
        needsTicket: false
      };
    }
    if (message.includes('ads') || message.includes('marketing') || message.includes('creative')) {
      return {
        response: `${websiteKnowledge.products.adsGenerator.description} If your ads aren't generating or you're not satisfied with the output quality, I can help troubleshoot or escalate to our team.`,
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
    
    // Default response for unmatched queries
    return {
      response: "I'm here to help! Since this issue might need a human agent, would you like me to create a support ticket for you? Please provide more details about what you're trying to do or what problem you're experiencing.",
      needsTicket: true
    };
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

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

  const handleNotSatisfied = () => {
    setShowTicketForm(true);
  };

  const handleTicketSubmit = async () => {
    if (!ticketForm.name || !ticketForm.email || !ticketForm.subject || !ticketForm.description) {
      showToastMessage("Please fill in all fields");
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      showToastMessage("Support ticket created successfully! Our team will contact you within 24 hours.");
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
    }, 500);
  };

  return (
    <div className="font-sans">
      {/* Toast Notification */}
      {showToast && (
        <div 
          className="fixed top-4 right-4 z-50 transition-all duration-300 transform"
          style={{ 
            opacity: showToast ? 1 : 0,
            transform: showToast ? 'translateY(0)' : 'translateY(-20px)'
          }}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-md">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="text-sm text-gray-700">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white border-0 hover:scale-110 transition-all duration-300 hover:shadow-purple-500/25"
        >
          {/* Pulse animation ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-ping opacity-20"></div>
          
          {/* Icon with smooth transition */}
          <div className="relative z-10 transition-transform duration-200">
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </div>
          
          {/* Sparkle effect */}
          <Sparkles className="absolute top-1 right-1 h-3 w-3 text-yellow-300 animate-pulse" />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 w-96 h-96 z-30 transition-all duration-300 transform"
          style={{
            height: '600px',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <div className="h-full shadow-2xl border-0 overflow-hidden flex flex-col bg-white/95 backdrop-blur-xl rounded-lg">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-6 flex-shrink-0 relative overflow-hidden rounded-t-lg">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              
              <div className="relative flex items-center gap-3 text-lg font-semibold">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    PostPilot AI Assistant
                    <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Online
                    </div>
                  </div>
                  <div className="text-xs font-normal text-white/80 flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Powered by AI • Responds in seconds
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-0 flex-1 flex flex-col min-h-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0 bg-gradient-to-b from-gray-50/50 to-white">
                {messages.map((message, index) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} transition-all duration-300`}
                    style={{ 
                      opacity: 1,
                      transform: 'translateY(0)',
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className={`flex items-start gap-3 max-w-[85%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.isBot 
                          ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white' 
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 text-white'
                      }`}>
                        {message.isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </div>
                      <div className={`rounded-2xl p-4 shadow-md backdrop-blur-sm ${
                        message.isBot 
                          ? 'bg-white border border-gray-100 text-gray-800' 
                          : 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                          <Clock className="h-3 w-3" />
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {message.showTicketOption && (
                          <button
                            className="mt-3 h-8 text-xs bg-white/10 border border-white/20 text-purple-700 hover:bg-purple-50 transition-all duration-200 px-3 py-1 rounded-md flex items-center gap-2"
                            onClick={handleNotSatisfied}
                          >
                            <LifeBuoy className="h-3 w-3" />
                            Create Support Ticket
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading animation */}
                {isLoading && (
                  <div className="flex justify-start transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center shadow-lg">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-md">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-gray-500">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-100 p-4 flex-shrink-0 bg-white/80 backdrop-blur-sm rounded-b-lg">
                <div className="flex gap-3 items-end">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      maxLength={500}
                      className="w-full pr-12 border-2 border-gray-200 focus:border-purple-400 rounded-xl bg-white/70 backdrop-blur-sm transition-all duration-200 px-3 py-2 text-sm focus:outline-none"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                      {inputMessage.length}/500
                    </div>
                  </div>
                  <button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className="h-10 w-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 flex-shrink-0 hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 flex items-center justify-center gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  Powered by AI • Press Enter to send
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Ticket Modal */}
      {showTicketForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-lg max-w-md w-full mx-4">
            <div className="p-6">
              <div className="pb-4">
                <div className="flex items-center gap-3 text-xl font-semibold mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <LifeBuoy className="h-4 w-4 text-white" />
                  </div>
                  Create Support Ticket
                </div>
                <p className="text-sm text-gray-600">Our support team will get back to you within 24 hours</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={ticketForm.name}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full border-2 border-gray-200 focus:border-purple-400 rounded-lg transition-all duration-200 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={ticketForm.email}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@company.com"
                    className="w-full border-2 border-gray-200 focus:border-purple-400 rounded-lg transition-all duration-200 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief description of your issue"
                    className="w-full border-2 border-gray-200 focus:border-purple-400 rounded-lg transition-all duration-200 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Please provide detailed information about your inquiry or issue..."
                    rows={4}
                    className="w-full border-2 border-gray-200 focus:border-purple-400 rounded-lg transition-all duration-200 resize-none px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setShowTicketForm(false)}
                    className="flex-1 border-2 border-gray-200 hover:bg-gray-50 transition-all duration-200 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleTicketSubmit}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:scale-105 transition-all duration-200 shadow-lg px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;