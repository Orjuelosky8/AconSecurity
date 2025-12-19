"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Star, ThumbsUp, X } from 'lucide-react';
import img1 from './../media/necesidades1.jpg';
import img2 from './../media/necesidades2.jpg';
import img3 from './../media/necesidades3.jpeg';
import img4 from './../media/necesidades4.png';
import img5 from './../media/necesidades5.jpg';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ScrollArea } from '@/components/ui/scroll-area';

export const services = [
  {
    title: 'Vigilancia Fija',
    shortDescription: 'Protección permanente con guardias capacitados para resguardar la integridad de personas y bienes en un punto determinado.',
    longDescription: 'Acon Security provee guardias de seguridad altamente capacitados en puestos fijos (como accesos, recepciones o puntos críticos) para vigilar instalaciones corporativas, residenciales o industriales. El objetivo principal es prevenir, disuadir y responder ante cualquier amenaza, asegurando controles de acceso efectivos y custodia continua.',
    image: img1,
    dataAiHint: 'security guard reception',
    highlight: 'Nuestros guardias reciben más de 100 horas de capacitación anual en protocolos de emergencia y atención al cliente.',
    testimonials: [
      { name: 'Constructora ABC', comment: 'La vigilancia fija ha reducido los incidentes en nuestras obras en un 90%. Su personal es profesional y siempre alerta.' },
      { name: 'Conjunto Residencial El Roble', comment: 'El control de acceso ha mejorado notablemente la seguridad y tranquilidad de los residentes. ¡Excelente servicio!' },
    ],
    className: 'lg:row-span-2',
  },
  {
    title: 'Vigilancia Móvil',
    shortDescription: 'Cobertura de áreas extensas mediante rondas constantes en vehículos para una supervisión y respuesta rápida.',
    longDescription: 'Esta modalidad cubre áreas extensas mediante rondas constantes realizadas por vigilantes en vehículos o motocicletas. La vigilancia móvil complementa la fija, permitiendo supervisar perímetros y responder rápidamente a incidentes en diferentes puntos. Nuestros guardas motorizados están equipados con radios y medios de comunicación para atender emergencias o alarmas en ruta.',
    image: img2,
    dataAiHint: 'security vehicle patrol',
    highlight: 'Nuestra flota de patrullas está equipada con GPS y comunicación directa con la central para una respuesta coordinada en menos de 5 minutos.',
    testimonials: [
      { name: 'Parque Industrial ZETA', comment: 'Las rondas motorizadas han sido clave para prevenir el vandalismo en nuestras instalaciones. Muy eficaces.' },
    ],
  },
  {
    title: 'Escolta de Mercancías',
    shortDescription: 'Protección armada de bienes y carga durante su transporte para prevenir robos y asegurar su llegada a destino.',
    longDescription: 'Protección armada de bienes y carga durante su transporte para prevenir robos o ataques a convoyes. Desplegamos esquemas de escolta de vehículos de carga con personal entrenado para salvaguardar mercancías valiosas en rutas urbanas y carreteras, incluyendo coordinación con autoridades y monitoreo en tiempo real.',
    image: img3,
    dataAiHint: 'cargo truck security',
    highlight: 'Contamos con una tasa de éxito del 99.8% en la entrega segura de mercancías valiosas en rutas de alto riesgo.',
    testimonials: [
      { name: 'Logística Express', comment: 'La seguridad que Acon brinda a nuestra carga es insuperable. Su planeación y ejecución son impecables.' },
    ],
  },
  {
    title: 'Seguridad Electrónica y Monitoreo 24/7',
    shortDescription: 'Nuestra central supervisa cámaras, alarmas y sensores en tiempo real para una respuesta inmediata ante cualquier evento.',
    longDescription: 'Operamos una central de monitoreo 24/7 donde operadores supervisan cámaras, alarmas y sensores en tiempo real para alertar y coordinar respuestas inmediatas. Esta central integrada permite vigilancia ininterrumpida apoyándose en sistemas electrónicos: alarmas de intrusión, CCTV y control de accesos remoto.',
    image: img4,
    dataAiHint: 'security control room',
    highlight: 'Nuestra central de monitoreo procesa más de 1,000 eventos diarios con un tiempo de respuesta promedio de 30 segundos.',
    testimonials: [
      { name: 'Centro Comercial Gran Plaza', comment: 'El monitoreo 24/7 nos ha permitido anticipar y resolver situaciones antes de que escalen. Es un servicio indispensable.' },
    ],
  },
  {
    title: 'Escolta a Personas',
    shortDescription: 'Servicio de protección personal especializada para garantizar la integridad física en desplazamientos y actividades diarias.',
    longDescription: 'Ofrecemos seguridad cercana para ejecutivos, funcionarios o particulares que requieran protección especializada. Nuestros escoltas (armados o sin arma) acompañan al cliente y planifican su seguridad en desplazamientos y actividades diarias, garantizando la integridad física del protegido mediante planes personalizados y personal entrenado.',
    image: img5,
    dataAiHint: 'bodyguard executive protection',
    highlight: 'Nuestros escoltas son bilingües y entrenados en manejo defensivo y evasivo, garantizando seguridad en cualquier escenario.',
    testimonials: [
      { name: 'CEO de Tech Corp', comment: 'El profesionalismo y discreción del equipo de escoltas de Acon es excepcional. Me siento seguro en todo momento.' },
    ],
  },
];

export type Service = typeof services[0];

interface PortfolioProps {
  onServiceSelect: (serviceTitle: string) => void;
  selectedService: Service | null;
  onCloseModal: () => void;
}

export default function Portfolio({ onServiceSelect, selectedService, onCloseModal }: PortfolioProps) {

  const handleOpenModal = (e: React.MouseEvent, service: Service) => {
    e.preventDefault();
    onServiceSelect(service.title);
  };

  return (
    <>
      <section id="services" className="py-20 sm:py-32 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-primary">Soluciones Integrales de Seguridad</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Combinamos personal experto y tecnología avanzada para ofrecer la protección que necesitas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <a href="#" key={service.title} onClick={(e) => handleOpenModal(e, service)} className={`group relative block overflow-hidden rounded-xl ${service.className}`}>
                <div className="relative h-full w-full min-h-[300px] lg:min-h-[400px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    data-ai-hint={service.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-primary/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-shadow-lg">
                      {service.title}
                    </h3>
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:mt-4 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <p className="text-primary-foreground/90">{service.shortDescription}</p>
                      <div className="mt-4 flex items-center font-semibold text-accent">
                        Conoce más <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <AlertDialog open={!!selectedService} onOpenChange={(open) => { if (!open) onCloseModal(); }}>
          <AlertDialogContent className="w-[95vw] sm:w-full max-w-2xl bg-card border-border shadow-2xl rounded-2xl p-0 flex flex-col max-h-[90vh]">
            <AlertDialogHeader className="p-4 sm:p-6 pb-4 border-b sticky top-0 bg-card z-10">
              <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-primary pr-10">
                {selectedService.title}
              </AlertDialogTitle>
              <Button
                variant="destructive"
                size="icon"
                onClick={onCloseModal}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full w-8 h-8 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </AlertDialogHeader>

            <Carousel
              className="w-full flex-1 relative min-h-0"
              plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
              opts={{ loop: true }}
            >
              <CarouselContent className="h-full min-h-0">
                <CarouselItem className="flex flex-col min-h-0">
                  <ScrollArea className="h-full w-full">
                    <div className="p-4 sm:p-6 space-y-6">
                      <AlertDialogDescription className="text-base text-muted-foreground">
                        {selectedService.longDescription}
                      </AlertDialogDescription>
                      <Separator className="bg-border/50" />
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-accent mb-4 flex items-center gap-2">
                          <ThumbsUp className="h-5 w-5" />
                          Destacado
                        </h3>
                        <p className="text-muted-foreground bg-muted p-4 rounded-lg border border-border/50 italic">
                          "{selectedService.highlight}"
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </CarouselItem>

                <CarouselItem className="flex flex-col min-h-0">
                  <ScrollArea className="h-full">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-accent mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Testimonios de Clientes
                      </h3>
                      <div className="space-y-4">
                        {selectedService.testimonials.map((testimonial, index) => (
                          <div key={index} className="bg-background p-4 rounded-lg border border-border/30">
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <p className="text-muted-foreground italic mb-2">"{testimonial.comment}"</p>
                            <p className="text-right font-semibold text-foreground text-sm">- {testimonial.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>

            <AlertDialogFooter className="p-4 sm:p-6 pt-4 border-t sticky bottom-0 bg-card z-10 flex-shrink-0 flex-row justify-end">
               <Button variant="outline" onClick={onCloseModal} className="w-full sm:w-auto">
                Cerrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}
