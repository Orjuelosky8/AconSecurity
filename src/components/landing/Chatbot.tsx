
"use client";

import { useState, useTransition, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, User, Loader2, Send } from 'lucide-react';
import { solutionAssistant, SolutionAssistantInput } from '@/ai/flows/solution-assistant-flow';
import { useSearchParams } from 'next/navigation';

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
    // This effect runs only once on component mount
    if (initialData) {
      // Flow when opened from the form
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
      // Flow when opened directly
      setMessages([{ role: 'assistant', content: '¡Hola! Soy tu asistente de Acon Shield. ¿En qué puedo ayudarte hoy? Cuéntame qué necesitas.' }]);
    }
  }, []); // Empty dependency array ensures this runs only once

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
    <Card className="w-full h-full shadow-2xl flex flex-col transition-all duration-300 bg-card">
      <CardHeader className="flex flex-row items-center gap-4 p-4 border-b color3 text-primary-foreground rounded-t-lg">
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="Jessica Smith" data-ai-hint="woman smiling"/>
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-bold tracking-tight">Asistente Acon Shield</CardTitle>
          <div className="text-xs text-primary-foreground/80 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400"></span>
            Online
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4 space-y-4" ref={scrollAreaRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <Avatar className="h-8 w-8 bg-muted text-muted-foreground">
                  <AvatarFallback><Bot size={20}/></AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg px-4 py-2 max-w-[85%] whitespace-pre-wrap text-sm shadow-md ${msg.role === 'assistant' ? 'bg-muted text-foreground' : 'color3 text-primary-foreground'}`}>
                {isPending && (msg.content === '...' || msg.content === 'Analizando tu solicitud...') ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="italic">{msg.content}</span>
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: msg.content.replace(/\\n/g, '<br />') }} />
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
      <CardFooter className="p-3 border-t bg-background/50 rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
          <Input 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={isPending}
            autoComplete="off"
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isPending || !userInput.trim()} aria-label="Enviar mensaje">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
