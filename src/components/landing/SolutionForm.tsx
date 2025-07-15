"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Building, Home, Calendar, ShieldCheck, Cpu, DraftingCompass, Search, UserCheck, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const solutionSchema = z.object({
  solutionType: z.string({ required_error: "Selecciona una solución." }).min(1),
  entityType: z.string({ required_error: "Selecciona un tipo." }).min(1),
  situation: z.string({ required_error: "Selecciona tu situación." }).min(1),
});

type FormData = z.infer<typeof solutionSchema>;

const stepOptions = {
  solutionType: [
    { value: 'mi-empresa', label: 'Mi Empresa', icon: Building },
    { value: 'mi-hogar', label: 'Mi Hogar', icon: Home },
    { value: 'un-evento', label: 'Un Evento', icon: Calendar },
  ],
  entityType: [
    { value: 'vigilancia-fisica', label: 'Vigilancia Física', icon: ShieldCheck },
    { value: 'vigilancia-tecnologica', label: 'Vigilancia Tecnológica', icon: Cpu },
    { value: 'consultoria', label: 'Consultoría', icon: DraftingCompass },
  ],
  situation: [
    { value: 'prevencion-robos', label: 'Prevención de Robos', icon: Search },
    { value: 'control-acceso', label: 'Control de Acceso', icon: UserCheck },
    { value: 'monitoreo-remoto', label: 'Monitoreo Remoto', icon: Cpu },
    { value: 'otro', label: 'Otro', icon: ArrowRight },
  ],
};

export default function SolutionForm() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(solutionSchema),
    mode: 'onChange',
    defaultValues: {
      solutionType: '',
      entityType: '',
      situation: '',
    }
  });

  const onSubmit = (data: FormData) => {
    startTransition(() => {
        const params = new URLSearchParams(data);
        router.push(`/chat?${params.toString()}`);
    });
  };

  return (
    <section id="assistant-form" className="py-20 sm:py-24 bg-background relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-accent/30 bg-card shadow-2xl shadow-accent/10 rounded-2xl">
          <CardHeader className="text-center p-6 sm:p-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-accent">Encuentra tu Solución de Seguridad Ideal</h2>
            <p className="text-md sm:text-lg text-muted-foreground pt-2 max-w-2xl mx-auto">
              Solo 3 pasos te separan de la tranquilidad. Déjanos guiarte.
            </p>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Step 1 */}
                <Controller
                  name="solutionType"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                        <span className="text-2xl font-bold">1</span>
                      </div>
                      <h3 className="font-semibold mb-2">Busco solución para</h3>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                        <SelectContent>
                          {stepOptions.solutionType.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              <div className="flex items-center gap-2">
                                <opt.icon className="h-4 w-4" />
                                <span>{opt.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.solutionType && <p className="text-destructive text-xs mt-1">{errors.solutionType.message}</p>}
                    </div>
                  )}
                />
                {/* Step 2 */}
                <Controller
                  name="entityType"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                        <span className="text-2xl font-bold">2</span>
                      </div>
                      <h3 className="font-semibold mb-2">Tipo de servicio</h3>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                        <SelectContent>
                           {stepOptions.entityType.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              <div className="flex items-center gap-2">
                                <opt.icon className="h-4 w-4" />
                                <span>{opt.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.entityType && <p className="text-destructive text-xs mt-1">{errors.entityType.message}</p>}
                    </div>
                  )}
                />
                {/* Step 3 */}
                <Controller
                  name="situation"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                        <span className="text-2xl font-bold">3</span>
                      </div>
                      <h3 className="font-semibold mb-2">Situación</h3>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full"><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                        <SelectContent>
                           {stepOptions.situation.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>
                              <div className="flex items-center gap-2">
                                <opt.icon className="h-4 w-4" />
                                <span>{opt.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                       {errors.situation && <p className="text-destructive text-xs mt-1">{errors.situation.message}</p>}
                    </div>
                  )}
                />
              </div>
              <div className="flex justify-center mt-8">
                <Button type="submit" disabled={isPending || !isValid} size="lg" className="w-full max-w-xs bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-lg text-lg">
                  {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Obtener recomendación'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
