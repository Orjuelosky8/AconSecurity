
"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { solutionAssistant, type SolutionAssistantInput } from "@/ai/flows/solution-assistant-flow";

type Message = {
  role: "user" | "assistant";
  content: string;
};

interface ChatbotProps {
  onClose: () => void;
  initialData?: SolutionAssistantInput | null;
}

const sampleMessages: Message[] = [
  {
    role: "assistant",
    content: "¡Hola! Soy tu asistente de Acon Shield. Basado en tu selección, he preparado algunas recomendaciones para ti.",
  },
  {
    role: "assistant",
    content: `
      <div>
        Para la <strong>prevención de robos en tu empresa</strong>, te sugiero considerar:
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li>Instalar un sistema de <a href="#services" class="underline text-primary">CCTV inteligente con IA</a> para detectar intrusos.</li>
          <li>Implementar <a href="#services" class="underline text-primary">guardas de seguridad</a> para rondas perimetrales.</li>
        </ul>
        <p class="mt-3">¿Quieres una personalización más detallada?</p>
      </div>
    `,
  },
  {
    role: "user",
    content: "Sí, me interesa la opción de CCTV con IA. ¿Puedes darme más detalles?",
  }
];


export default function Chatbot({ onClose, initialData = null }: ChatbotProps) {
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialData) {
      startTransition(async () => {
        const assistantResponse = await solutionAssistant(initialData);
        setMessages([
          {
            role: "assistant",
            content: assistantResponse,
          },
        ]);
      });
    } else {
       setMessages(sampleMessages);
    }
  }, [initialData]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isPending) return;

    const userMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput("");

    startTransition(async () => {
       const botResponse: Message = {
        role: "assistant",
        content: "Gracias por los detalles. Un especialista revisará tu caso y se pondrá en contacto contigo. ¿Hay algo más en lo que pueda ayudarte?",
      };
      setMessages((prev) => [...prev, botResponse]);
    });
  };

  return (
    <Card className="w-[400px] max-w-full h-[640px] max-h-[85vh] shadow-2xl rounded-2xl flex flex-col border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center gap-4 p-4 border-b bg-gradient-to-br from-primary/80 to-accent/70 text-primary-foreground relative shadow-sm">
        <Avatar>
          <AvatarImage
            src="https://placehold.co/40x40.png"
            alt="Acon Shield Assistant"
            data-ai-hint="logo shield"
          />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg font-bold tracking-tight">
            Asistente Acon Shield
          </CardTitle>
          <div className="text-xs text-primary-foreground/90 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            Online
          </div>
        </div>
         <button
          onClick={onClose}
          className="absolute top-1/2 -translate-y-1/2 right-4 z-10 rounded-full p-1.5 hover:bg-black/20 transition-colors flex items-center justify-center"
          aria-label="Cerrar chatbot"
          type="button"
        >
          <X className="w-5 h-5 text-primary-foreground/80" />
        </button>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea
          className="h-full p-4 space-y-6"
          ref={scrollAreaRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-8 w-8 bg-muted text-muted-foreground self-start shadow-sm flex items-center justify-center">
                   <Bot size={20} className='text-primary'/>
                </Avatar>
              )}
              
              <div
                  className={`rounded-2xl px-4 py-3 max-w-[85%] text-sm shadow-md
                  ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-muted-foreground rounded-bl-none'
                  }`}
                >
                   <div className="prose prose-sm text-inherit" dangerouslySetInnerHTML={{ __html: msg.content }} />
              </div>
          
              {msg.role === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
             <div className="flex items-end gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-muted text-muted-foreground self-start shadow-sm flex items-center justify-center">
                    <Bot size={20} className='text-primary'/>
                </Avatar>
                <div className="rounded-2xl px-4 py-3 max-w-[85%] text-sm shadow-md bg-muted text-muted-foreground rounded-bl-none">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-150"></span>
                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse delay-300"></span>
                    </div>
                </div>
             </div>
          )}
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-3 border-t bg-background/30 shadow-inner">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-3 w-full"
        >
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder="Escribe tu mensaje..."
            disabled={isPending}
            autoComplete="off"
            className="flex-1 resize-none bg-muted border-transparent focus:ring-primary scrollbar-hide rounded-xl px-3 py-2 text-base shadow-inner"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isPending || !userInput.trim()}
            aria-label="Enviar mensaje"
            className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 transition-transform shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
