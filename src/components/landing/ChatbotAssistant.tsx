
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
import { solutionAssistant, SolutionAssistantInput } from '@/ai/flows/solution-assistant-flow';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';

const solutionSchema = z.object({
  solutionType: z.string({ required_error: "Por favor, selecciona una solución." }),
  entityType: z.string({ required_error: "Por favor, selecciona un tipo." }),
  situation: z.string({ required_error: "Por favor, selecciona tu situación." }),
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
      const initialMessage: Message = {
        role: 'assistant',
        content: 'Analizando tu solicitud...'
      };
      setMessages([initialMessage]);
      
      const response = await solutionAssistant(data);

      const finalMessage: Message = {
        role: 'assistant',
        content: response,
      };
      setMessages([finalMessage]);
    });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: Message = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage, { role: 'assistant', content: '...' }]);
    setUserInput('');

    startTransition(async () => {
        // Here you would typically call your AI flow again with the new context
        // For this example, we'll provide a canned response.
        await new Promise(resolve => setTimeout(resolve, 1000));
        const botResponse: Message = { role: 'assistant', content: 'Gracias por tu mensaje. Un especialista se pondrá en contacto contigo para continuar la conversación y ofrecerte una solución a medida. También puedes explorar nuestros <a href="#services" class="underline text-primary">servicios</a>.' };
        setMessages(prev => [...prev.slice(0, -1), botResponse]);
    });
  }

  return (
    <section id="assistant" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-accent/30 bg-card shadow-2xl shadow-accent/5">
          {!showChat ? (
            <>
              <CardHeader className="text-center p-6 sm:p-8">
                <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-accent">Encuentra la solución estratégica para tu necesidad</CardTitle>
                <CardDescription className="text-md sm:text-lg text-muted-foreground pt-2">
                  Selecciona las opciones y nuestro asistente te guiará a la mejor solución.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="solutionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Busco una solución para</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Selecciona una opción" /></SelectTrigger>
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
                        <FormItem>
                          <FormLabel>Tipo</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Selecciona el tipo" /></SelectTrigger>
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
                        <FormItem>
                          <FormLabel>¿Cuál es tu situación?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Describe tu situación" /></SelectTrigger>
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
                    <Button type="submit" disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold py-6 rounded-lg">
                      {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Buscando...</> : 'Buscar Solución'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col h-[60dvh]">
              <CardHeader className="text-center p-4 border-b">
                 <CardTitle className="text-2xl font-bold tracking-tight text-accent flex items-center justify-center gap-2"><Bot /> Asistente Virtual</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full p-4 space-y-4">
                      {messages.map((msg, index) => (
                          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                              {msg.role === 'assistant' && (
                                  <Avatar className="h-8 w-8">
                                      <AvatarFallback><Bot size={20}/></AvatarFallback>
                                  </Avatar>
                              )}
                              <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                  {msg.content === '...' || msg.content === 'Analizando tu solicitud...' ? (
                                      <div className="flex items-center gap-2">
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                          <span>{msg.content}</span>
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
              <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input 
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder="Escribe tu mensaje..."
                          disabled={isPending}
                      />
                      <Button type="submit" size="icon" disabled={isPending}>
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
