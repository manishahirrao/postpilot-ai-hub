
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m PostPilot\'s AI Assistant. How can I help you today? I can answer questions about our LinkedIn automation features, pricing, or anything else you\'d like to know!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "We offer three pricing tiers: Free (basic features, 5 posts/month), Professional ($29/month - unlimited posts, resume builder, job matcher), and Business ($99/month - all features plus AI video generation and advanced analytics). Annual billing saves 20%! Would you like to see our detailed pricing page?";
    }
    
    if (lowerMessage.includes('linkedin') || lowerMessage.includes('post')) {
      return "Our LinkedIn post generation feature uses AI to create engaging content tailored to your professional background. It can generate titles, write compelling content, create images with DALL-E, and even help with posting directly to LinkedIn. Would you like to try it out?";
    }
    
    if (lowerMessage.includes('resume')) {
      return "Our resume builder can enhance your existing resume using AI to make it more ATS-friendly and compelling to employers. Just upload your current resume and our AI will suggest improvements to highlight your achievements better.";
    }
    
    if (lowerMessage.includes('job') || lowerMessage.includes('match')) {
      return "Our job matcher analyzes your profile and finds the best job opportunities for you using AI embeddings to match your skills with job requirements. It can also help tailor your resume for specific positions.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can also visit our Support page for detailed guides, contact our support team directly, or check out our Help Center. Is there something specific you'd like assistance with?";
    }
    
    if (lowerMessage.includes('feature') || lowerMessage.includes('what')) {
      return "PostPilot offers four main features: 1) LinkedIn Post Generation with AI-powered content and images, 2) Resume Builder/Enhancer for ATS optimization, 3) Profile-Job Matcher to find relevant opportunities, and 4) Career Analytics for insights and improvement tips. Which one interests you most?";
    }
    
    return "That's a great question! I'd be happy to help you learn more about PostPilot. Our platform specializes in LinkedIn automation and career advancement tools. Feel free to ask about specific features, pricing, or how we can help with your professional growth. You can also contact our sales team for a personalized demo!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await simulateAIResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment or contact our support team for immediate assistance.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What features does PostPilot offer?",
    "How much does it cost?",
    "How does the LinkedIn post generator work?",
    "Can you help me with my resume?"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-all duration-300 hover:scale-110"
          size="sm"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">PostPilot Assistant</h3>
                <p className="text-sm text-indigo-100">How can I help you today?</p>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-indigo-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is typing...</span>
                  </div>
                </div>
              )}
              
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 font-medium">Suggested questions:</p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="block w-full text-left p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded border border-indigo-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
