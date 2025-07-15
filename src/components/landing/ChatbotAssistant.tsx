
"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, User, Loader2, Send } from 'lucide-react';
import { solutionAssistant } from '@/ai/flows/solution-assistant-flow';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';

const solutionSchema = z.object({
  solutionType: z.string({ required_error: "Por favor, selecciona una solución." }).min(1, "Por favor, selecciona una solución."),
  entityType: z.string({ required_error: "Por favor, selecciona un tipo." }).min(1, "Por favor, selecciona un tipo."),
  situation: z.string({ required_error: "Por favor, selecciona tu situación." }).min(1, "Por favor, selecciona tu situación."),
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatbotAssistant() {
  const [isPending, startTransition] = useTransition();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');

  const form = useForm<z.infer<typeof solutionSchema>>({
    resolver: zodResolver(solutionSchema),
  });

  const onSubmit = (data: z.infer<typeof solutionSchema>) => {
    startTransition(async () => {
      setShowChat(true);
      const initialUserMessage: Message = {
        role: 'user',
        content: `Busco una solución para: ${data.solutionType}, específicamente en ${data.entityType} para ${data.situation}.`
      };
      const thinkingMessage: Message = {
        role: 'assistant',
        content: 'Analizando tu solicitud...'
      };
      setMessages([initialUserMessage, thinkingMessage]);
      
      const response = await solutionAssistant(data);

      const finalMessage: Message = {
        role: 'assistant',
        content: response,
      };
      setMessages([initialUserMessage, finalMessage]);
    });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: userInput };
    const thinkingMessage: Message = { role: 'assistant', content: '...' };
    setMessages(prev => [...prev, userMessage, thinkingMessage]);
    setUserInput('');

    startTransition(async () => {
        // This is a placeholder for a follow-up AI call.
        await new Promise(resolve => setTimeout(resolve, 1500));
        const botResponse: Message = { role: 'assistant', content: 'Gracias por los detalles adicionales. Un especialista de Acon Shield revisará tu caso y se pondrá en contacto contigo a la brevedad para ofrecerte una asesoría personalizada. ¿Hay algo más en lo que pueda ayudarte?' };
        setMessages(prev => [...prev.slice(0, -1), botResponse]);
    });
  }

  return (
    <section id="assistant" className="py-12 sm:py-16 bg-background relative -mt-24 z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-accent/30 bg-card shadow-2xl shadow-accent/10">
          {!showChat ? (
            <>
              <CardHeader className="text-center p-6 sm:p-8">
                <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-accent">Encuentra la Solución Estratégica para tu Necesidad</CardTitle>
                <CardDescription className="text-md sm:text-lg text-muted-foreground pt-2">
                  Completa los campos y nuestro asistente inteligente te guiará.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <FormField
                      control={form.control}
                      name="solutionType"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Busco solución para</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mi-empresa">Mi Empresa</SelectItem>
                              <SelectItem value="mi-hogar">Mi Hogar</SelectItem>
                              <SelectItem value="un-evento">Un Evento</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="entityType"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Tipo de servicio</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="vigilancia-fisica">Vigilancia Física</SelectItem>
                              <SelectItem value="vigilancia-tecnologica">Vigilancia Tecnológica</SelectItem>
                              <SelectItem value="consultoria">Consultoría</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="situation"
                      render={({ field }) => (
                        <FormItem className="md:col-span-1">
                          <FormLabel>Situación</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="prevencion-robos">Prevención de Robos</SelectItem>
                              <SelectItem value="control-acceso">Control de Acceso</SelectItem>
                              <SelectItem value="monitoreo-remoto">Monitoreo Remoto</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isPending} className="w-full md:col-span-1 bg-accent text-accent-foreground hover:bg-accent/90 h-10 font-bold rounded-lg">
                      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Buscar'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col h-[70dvh] md:h-[60dvh]">
              <CardHeader className="text-center p-4 border-b">
                 <CardTitle className="text-xl font-bold tracking-tight text-accent flex items-center justify-center gap-2"><Bot /> Asistente de Soluciones Acon Shield</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4 space-y-4">
                      {messages.map((msg, index) => (
                          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                              {msg.role === 'assistant' && (
                                  <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                                      <AvatarFallback><Bot size={20}/></AvatarFallback>
                                  </Avatar>
                              )}
                              <div className={`rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap ${msg.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                  {msg.content === '...' || msg.content === 'Analizando tu solicitud...' ? (
                                      <div className="flex items-center gap-2">
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                          <span className="italic">{msg.content}</span>
                                      </div>
                                  ) : (
                                      <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br />') }} />
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
              <div className="p-4 border-t bg-background/50">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input 
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder="Escribe un mensaje para más detalles..."
                          disabled={isPending}
                          autoComplete="off"
                      />
                      <Button type="submit" size="icon" disabled={isPending || !userInput.trim()} aria-label="Enviar mensaje">
                          <Send className="h-4 w-4" />
                      </Button>
                  </form>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
