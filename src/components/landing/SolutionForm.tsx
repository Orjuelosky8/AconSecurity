"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Building, Home, Calendar, ShieldCheck, Cpu, DraftingCompass, Search, UserCheck, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
      // const params = new URLSearchParams(data);
      // window.location.href = `/chat?${params.toString()}`;
      onSubmit(data);
    });
  };

  // Select oscuro moderno
  function ModernDarkSelect({ field, options, placeholder = "Selecciona..." }: any) {
    return (
      <div className="relative w-full">
        <select
          {...field}
          className="
            w-full appearance-none rounded-2xl border border-accent
            bg-background text-white px-5 py-3 text-lg font-semibold
            shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
            transition-all duration-200 cursor-pointer
            hover:bg-background/80
            placeholder:text-white
          "
        >
          <option value="">Selecciona...</option>
          {options.map((opt: any) => (
            <option
              key={opt.value}
              value={opt.value}
              className="font-bold bg-background text-white"
              style={{
                background: "#181B20",
                color: "#fff",
              }}
            >
              {opt.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <svg className="w-6 h-6 text-accent opacity-80" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <section id="assistant-form" className="absolute top-[80%] left-1/2 -translate-x-1/2 w-full max-w-4xl z-20 px-4">
      <div className="border-accent/30 bg-card shadow-2xl shadow-accent/10 rounded-2xl z-20 relative">
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
                    <h3 className="font-semibold mb-2">Busco solución para</h3>
                    <Select onValueChange={(value) => {
                      field.onChange(value === field.value ? "Selecciona..." : value); // Deselecciona si el valor es igual
                    }} defaultValue={field.value}>
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
                    <h3 className="font-semibold mb-2">Tipo de servicio</h3>
                    <Select onValueChange={(value) => {
                      field.onChange(value === field.value ? "" : value); // Deselecciona si el valor es igual
                    }} defaultValue={field.value}>
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
                    <h3 className="font-semibold mb-2">Situación</h3>
                    <Select onValueChange={(value) => {
                      field.onChange(value === field.value ? "" : value); // Deselecciona si el valor es igual
                    }} defaultValue={field.value}>
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
              <button
                type="submit"
                disabled={isPending || !isValid}
                className={`
                color2 w-full max-w-xs bg-accent text-accent-foreground font-bold rounded-lg text-lg py-3
                transition-all duration-200 shadow-lg
                hover:bg-accent/90
                ${(!isValid || isPending) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              >
                {isPending ? "Cargando..." : "Obtener recomendación"}
              </button>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
}