"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Home, Shield, ShieldCheck, Users, Search, Lock, Truck, ShieldQuestion, Building2 } from 'lucide-react';

const solutionSchema = z.object({
  solutionType: z.string({ required_error: "Selecciona una solución." }).min(1, "Debes seleccionar una opción."),
  entityType: z.string({ required_error: "Selecciona un tipo." }).min(1, "Debes seleccionar una opción."),
  situation: z.string({ required_error: "Selecciona tu situación." }).min(1, "Debes seleccionar una opción."),
});

type FormData = z.infer<typeof solutionSchema>;

interface SolutionFormProps {
  onSubmit: (data: FormData) => void;
}

const stepOptions = {
  solutionType: [
    { value: 'mi-empresa', label: 'Mi Empresa', icon: Building },
    { value: 'mi-hogar', label: 'Mi Hogar', icon: Home },
    { value: 'conjunto-residencial', label: 'Mi Conjunto', icon: Building2 },
  ],
  entityType: [
    { value: 'vigilancia-fija', label: 'Vigilancia Fija', icon: ShieldCheck },
    { value: 'vigilancia-movil', label: 'Vigilancia Móvil', icon: Shield },
    { value: 'escoltas', label: 'Servicio de Escoltas', icon: Users },
    { value: 'seguridad-electronica', label: 'Seguridad Electrónica', icon: ShieldQuestion },
  ],
  situation: [
    { value: 'prevenir-robos', label: 'Prevenir Robos e Intrusiones', icon: Search },
    { value: 'control-accesos', label: 'Controlar Accesos', icon: Lock },
    { value: 'proteger-transporte', label: 'Proteger Mercancías o Personas', icon: Truck },
  ],
};

export default function SolutionForm({ onSubmit }: SolutionFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(solutionSchema),
    mode: "onChange",
    defaultValues: {
      solutionType: "",
      entityType: "",
      situation: "",
    },
  });

  const handleFormSubmit = (data: FormData) => {
    startTransition(() => {
      onSubmit(data);
    });
  };

  return (
    <section id="assistant-form" className="absolute top-[80%] left-1/2 -translate-x-1/2 w-full max-w-4xl z-20 px-4">
      <div className="border-border bg-card shadow-2xl rounded-2xl z-20 relative">
        <div className="text-center p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-accent">Encuentra tu Solución de Seguridad Ideal</h2>
          <p className="text-md sm:text-lg text-muted-foreground pt-2 max-w-2xl mx-auto">
            Solo 3 pasos te separan de la tranquilidad. Déjanos guiarte.
          </p>
        </div>
        <div className="p-6 sm:p-8 pt-0">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* 1. Solution Type */}
              <Controller
                name="solutionType"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                    <h3 className="font-semibold mb-2">Busco proteger</h3>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
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
                    {errors.solutionType && (
                      <p className="text-destructive text-xs mt-1">{errors.solutionType.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="entityType"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                    <h3 className="font-semibold mb-2">Necesito un servicio de</h3>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
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
                    {errors.entityType && (
                      <p className="text-destructive text-xs mt-1">{errors.entityType.message}</p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="situation"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                    <h3 className="font-semibold mb-2">Mi objetivo es</h3>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona..." />
                      </SelectTrigger>
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
                    {errors.situation && (
                      <p className="text-destructive text-xs mt-1">{errors.situation.message}</p>
                    )}
                  </div>
                )}
              />


            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isPending || !isValid}
                className="w-full max-w-xs text-lg py-3 h-auto"
                size="lg"
                variant="default"
              >
                {isPending ? "Cargando..." : "Obtener recomendación"}
              </Button>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
