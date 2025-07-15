"use client";

import { useState, useTransition, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Loader2, Send, X, MessageSquare } from 'lucide-react';
import { solutionAssistant, SolutionAssistantInput } from '@/ai/flows/solution-assistant-flow';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: SolutionAssistantInput | null;
}

export default function Chatbot({ isOpen, onClose, initialData }: ChatbotProps) {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMaximized(true);
      if (initialData && !hasStarted) {
        setHasStarted(true);
        startTransition(async () => {
          const initialUserMessage: Message = {
            role: 'user',
            content: `Busco una solución para: ${initialData.solutionType}, específicamente en ${initialData.entityType} para ${initialData.situation}.`
          };
          const thinkingMessage: Message = { role: 'assistant', content: 'Analizando tu solicitud...' };
          setMessages([initialUserMessage, thinkingMessage]);

          const response = await solutionAssistant(initialData);

          const finalMessage: Message = { role: 'assistant', content: response };
          setMessages([initialUserMessage, finalMessage]);
        });
      } else if (messages.length === 0) {
        setMessages([{ role: 'assistant', content: '¡Hola! Soy tu asistente de Acon Shield. ¿En qué puedo ayudarte hoy?' }]);
      }
    } else {
        setIsMaximized(false);
        setHasStarted(false); // Reset for next time
    }
  }, [isOpen, initialData]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: userInput };
    const thinkingMessage: Message = { role: 'assistant', content: '...' };
    setMessages(prev => [...prev, userMessage, thinkingMessage]);
    const currentInput = userInput;
    setUserInput('');

    startTransition(async () => {
        // This is a placeholder for a follow-up AI call.
        // For now, it gives a generic response.
        await new Promise(resolve => setTimeout(resolve, 1500));
        const botResponse: Message = { role: 'assistant', content: 'Gracias por los detalles. Un especialista revisará tu caso y se pondrá en contacto contigo. ¿Hay algo más en lo que pueda ayudarte?' };
        setMessages(prev => [...prev.slice(0, -1), botResponse]);
    });
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
        {!isMaximized ? (
            <Button onClick={() => setIsMaximized(true)} size="icon" className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg">
                <MessageSquare className="h-7 w-7" />
            </Button>
        ) : (
        <Card className="w-[calc(100vw-2rem)] sm:w-96 h-[70dvh] sm:h-[60dvh] shadow-2xl flex flex-col transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between p-3 border-b">
                <CardTitle className="text-lg font-bold tracking-tight text-accent flex items-center gap-2"><Bot /> Asistente Acon Shield</CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
                    <X className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4 space-y-4" ref={scrollAreaRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'assistant' && (
                                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                                    <AvatarFallback><Bot size={20}/></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg px-4 py-2 max-w-[85%] whitespace-pre-wrap text-sm ${msg.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                {msg.content === '...' || msg.content === 'Analizando tu solicitud...' ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="italic">{msg.content}</span>
                                    </div>
                                ) : (
                                    <p dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
                                )}
                            </div>
                            {msg.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><User size={20}/></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
            <div className="p-3 border-t bg-background/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        disabled={isPending}
                        autoComplete="off"
                    />
                    <Button type="submit" size="icon" disabled={isPending || !userInput.trim()} aria-label="Enviar mensaje">
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
        )}
    </div>
  );
}
