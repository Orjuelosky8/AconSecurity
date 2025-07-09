'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"


const techData = [
  {
    image: 'https://placehold.co/800x600.png',
    dataAiHint: 'security camera',
    title: 'Cámara IA de Perímetro',
    description: 'Nuestras cámaras con inteligencia artificial analizan el video en tiempo real, identificando intrusos, vehículos y comportamientos anómalos con una precisión sin precedentes.',
  },
  {
    image: 'https://placehold.co/800x600.png',
    dataAiHint: 'radar system',
    title: 'Radar de Detección Terrestre',
    description: 'El radar ofrece una capa adicional de seguridad, detectando movimiento en cualquier condición climática y de iluminación, inmune a falsas alarmas por animales pequeños o vegetación.',
  },
  {
    image: 'https://placehold.co/800x600.png',
    dataAiHint: 'video wall',
    title: 'Videowall para Centros de Monitoreo',
    description: 'Visualiza todas tus cámaras y sistemas en un único videowall de alta resolución, permitiendo a nuestros operadores una conciencia situacional completa y una respuesta más rápida.',
  },
];

export default function TechSlider() {
  return (
    <section id="tech" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Tecnología Avanzada</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Equipamiento de punta para una seguridad sin compromisos.
          </p>
        </div>
        <Carousel 
          className="w-full max-w-4xl mx-auto" 
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        >
          <CarouselContent>
            {techData.map((tech, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden bg-card border-primary/20">
                    <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-auto">
                            <Image
                                src={tech.image}
                                alt={tech.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                data-ai-hint={tech.dataAiHint}
                            />
                        </div>
                      <div className="flex flex-col p-6 justify-center">
                        <CardHeader>
                          <CardTitle className="text-2xl">{tech.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground text-base">{tech.description}</p>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
