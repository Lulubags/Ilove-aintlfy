import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Bot, User, MessageCircle, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
  embedded?: boolean;
}

export function Chatbot({ isOpen = false, onClose, embedded = false }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI business consultant. How can I help transform your business today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, sessionId }: { message: string; sessionId?: string }) => {
      const response = await apiRequest("POST", "/api/chat", { message, sessionId });
      return response.json();
    },
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || data.message, // Handle both response formats
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    },
    onError: (error) => {
      console.error('Chat error details:', error);
      
      // Extract more specific error message if available
      let errorMessage = "Failed to send message. Please try again.";
      if (error.message) {
        // Try to extract the actual error from the API response
        const match = error.message.match(/\d+: (.+)/);
        if (match && match[1]) {
          try {
            const errorData = JSON.parse(match[1]);
            errorMessage = errorData.error || errorMessage;
          } catch {
            errorMessage = match[1];
          }
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    sendMessageMutation.mutate({ 
      message: input.trim(), 
      sessionId 
    });
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: ChatMessage = {
      role: 'user',
      content: question,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    
    sendMessageMutation.mutate({ 
      message: question, 
      sessionId 
    });
  };

  const quickQuestions = [
    "What AI solutions do you offer?",
    "How can AI help my retail business?",
    "What's the implementation timeline?"
  ];

  if (embedded) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-50 shadow-lg">
          <CardContent className="p-8">
            <div className="bg-white rounded-lg shadow-inner h-96 p-6 mb-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-3 mb-4 ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="bg-blue-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                      <Bot size={16} />
                    </div>
                  )}
                  <div className={`p-3 rounded-lg max-w-xs ${
                    message.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 text-neutral rounded-tl-none'
                  }`}>
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="bg-green-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
              {sendMessageMutation.isPending && (
                <div className="flex items-start space-x-3 mb-4">
                  <div className="bg-blue-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-100 text-neutral p-3 rounded-lg rounded-tl-none max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex space-x-3 mb-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI solutions for your business..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={sendMessageMutation.isPending}
              />
              <Button 
                onClick={handleSend}
                disabled={sendMessageMutation.isPending || !input.trim()}
                className="bg-primary hover:bg-primary-dark"
              >
                <Send size={16} />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  disabled={sendMessageMutation.isPending}
                  className="text-sm"
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Bot className="text-primary" size={20} />
          <span className="font-semibold">AI Assistant</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>
      
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-neutral'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {sendMessageMutation.isPending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-neutral p-3 rounded-lg max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={sendMessageMutation.isPending}
            className="flex-1"
          />
          <Button 
            onClick={handleSend}
            disabled={sendMessageMutation.isPending || !input.trim()}
            size="icon"
            className="bg-primary hover:bg-blue-700"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ChatbotFloat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 transition-all duration-200"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    </>
  );
}
