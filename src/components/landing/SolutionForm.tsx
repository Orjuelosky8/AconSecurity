"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const solutionSchema = z.object({
  solutionType: z.string({ required_error: "Por favor, selecciona una solución." }).min(1, "Por favor, selecciona una solución."),
  entityType: z.string({ required_error: "Por favor, selecciona un tipo." }).min(1, "Por favor, selecciona un tipo."),
  situation: z.string({ required_error: "Por favor, selecciona tu situación." }).min(1, "Por favor, selecciona tu situación."),
});

export default function SolutionForm() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  
  const form = useForm<z.infer<typeof solutionSchema>>({
    resolver: zodResolver(solutionSchema),
    defaultValues: {
        solutionType: '',
        entityType: '',
        situation: '',
    }
  });

  const onSubmit = (data: z.infer<typeof solutionSchema>) => {
    startTransition(() => {
        const params = new URLSearchParams(data);
        router.push(`/chat?${params.toString()}`);
    });
  };

  return (
    <section id="assistant-form" className="py-12 sm:py-16 bg-background relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-accent/30 bg-card shadow-2xl shadow-accent/10">
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
        </Card>
      </div>
    </section>
  );
}
