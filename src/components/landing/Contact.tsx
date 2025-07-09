"use client";

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/app/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg font-bold py-6 rounded-lg">
      {pending ? 'Enviando...' : 'Agendar Demo'}
    </Button>
  );
}

export default function Contact() {
  const initialState = { message: '', errors: null, success: false };
  const [state, dispatch] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Formulario Enviado',
          description: state.message,
        });
        formRef.current?.reset();
      } else if (state.errors) {
         toast({
          title: 'Error en el formulario',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);


  return (
    <section id="contact" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border-accent/30 bg-card shadow-2xl shadow-accent/5">
          <CardHeader className="text-center p-8">
            <CardTitle className="text-4xl font-bold tracking-tight text-accent">Agenda tu demo 3D</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
              Descubre cómo nuestra tecnología puede proteger tus activos. Un experto te contactará.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <form ref={formRef} action={dispatch} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base">Nombre Completo</Label>
                <Input id="name" name="name" required className="h-12 text-base mt-2"/>
                {state.errors?.name && <p className="text-destructive text-sm mt-1">{state.errors.name[0]}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-base">Email</Label>
                <Input id="email" name="email" type="email" required className="h-12 text-base mt-2"/>
                {state.errors?.email && <p className="text-destructive text-sm mt-1">{state.errors.email[0]}</p>}
              </div>
              <div>
                <Label htmlFor="company" className="text-base">Empresa (Opcional)</Label>
                <Input id="company" name="company" className="h-12 text-base mt-2"/>
              </div>
              <div>
                <Label htmlFor="message" className="text-base">Mensaje</Label>
                <Textarea id="message" name="message" required rows={5} className="text-base mt-2"/>
                {state.errors?.message && <p className="text-destructive text-sm mt-1">{state.errors.message[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
