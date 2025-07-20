
"use client";

import { useState, useTransition, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User, Loader2, Send } from 'lucide-react';
import { solutionAssistant, SolutionAssistantInput } from '@/ai/flows/solution-assistant-flow';
import { useSearchParams } from 'next/navigation';
import { Textarea } from '../ui/textarea';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const initialData: SolutionAssistantInput | null = searchParams.has('solutionType') ? {
    solutionType: searchParams.get('solutionType')!,
    entityType: searchParams.get('entityType')!,
    situation: searchParams.get('situation')!,
  } : null;

  useEffect(() => {
    if (initialData) {
      const userMessageContent = `Busco una solución para: ${initialData.solutionType}, tipo: ${initialData.entityType}, situación: ${initialData.situation}.`;
      setMessages([{ role: 'user', content: userMessageContent }]);

      startTransition(async () => {
        const thinkingMessage: Message = { role: 'assistant', content: 'Analizando tu solicitud...' };
        setMessages(prev => [...prev, thinkingMessage]);
        
        const response = await solutionAssistant(initialData);
        
        const finalMessage: Message = { role: 'assistant', content: response };
        setMessages(prev => [prev[0], finalMessage]);
      });
    } else {
      setMessages([{ role: 'assistant', content: '¡Hola! Soy tu asistente de Acon Shield. ¿En qué puedo ayudarte hoy? Cuéntame qué necesitas.' }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput('');

    startTransition(async () => {
      const thinkingMessage: Message = { role: 'assistant', content: '...' };
      setMessages(prev => [...prev, thinkingMessage]);
      await new Promise(resolve => setTimeout(resolve, 1500));
      const botResponse: Message = { role: 'assistant', content: 'Gracias por los detalles. Un especialista revisará tu caso y se pondrá en contacto contigo. ¿Hay algo más en lo que pueda ayudarte?' };
      setMessages(prev => [...prev.slice(0, -1), botResponse]);
    });
  };

  return (
    <Card className="w-full h-full shadow-2xl flex flex-col transition-all duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center gap-4 p-4 border-b bg-gradient-to-r from-primary via-teal-500 to-teal-600 text-primary-foreground rounded-t-lg">
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="Acon Shield Assistant" data-ai-hint="logo shield"/>
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-bold tracking-tight">Asistente Acon Shield</CardTitle>
          <div className="text-xs text-primary-foreground/90 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            Online
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4 space-y-6 scrollbar-hide" ref={scrollAreaRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <Avatar className="h-8 w-8 bg-muted text-muted-foreground self-start">
                  <AvatarFallback><Bot size={20}/></AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm shadow-md ${msg.role === 'assistant' ? 'bg-muted text-foreground rounded-bl-none' : 'bg-primary text-primary-foreground rounded-br-none'}`}>
                {isPending && (msg.content === '...' || msg.content === 'Analizando tu solicitud...') ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="italic">{msg.content}</span>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\\n/g, '<br />') }} />
                )}
              </div>
               {msg.role === 'user' && (
                <Avatar className="h-8 w-8">
                   <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person avatar"/>
                  <AvatarFallback><User size={20}/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t bg-card/50 rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3 w-full">
           <Textarea 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder="Escribe tu mensaje..."
            disabled={isPending}
            autoComplete="off"
            className="flex-1 resize-none bg-background/70 border-border focus:ring-primary scrollbar-hide"
            rows={1}
          />
          <Button type="submit" size="icon" disabled={isPending || !userInput.trim()} aria-label="Enviar mensaje" className='rounded-full h-10 w-10 bg-accent hover:bg-accent/90 text-accent-foreground'>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
