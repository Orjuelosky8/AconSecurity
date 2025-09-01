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

import img1 from './../media/tech1.jpg';
import img2 from './../media/tech2.png';
import img3 from './../media/tech3.jpg';


const techData = [
  {
    image: img1,
    dataAiHint: 'security camera cctv',
    title: 'CCTV Avanzado con IA',
    description: 'Utilizamos cámaras de alta resolución con análisis de video inteligente para detectar movimientos y comportamientos sospechosos de forma automatizada, alertando a nuestra central 24/7.',
  },
  {
    image: img2,
    dataAiHint: 'alarm sensor system',
    title: 'Sistemas de Alarma y Sensores',
    description: 'Instalamos sensores de movimiento, de apertura y pánicos conectados a nuestra central, que activan alertas inmediatas ante cualquier ingreso no autorizado o emergencia.',
  },
  {
    image: img3,
    dataAiHint: 'access control biometric',
    title: 'Control de Acceso Electrónico',
    description: 'Implementamos sistemas con tarjetas, biometría o QR para regular y auditar el ingreso a instalaciones, garantizando que solo personal autorizado acceda a zonas restringidas.',
  },
   {
    image: img1, // Replaced missing img4 with img1
    dataAiHint: 'gps tracking satellite',
    title: 'Monitoreo Satelital y GPS',
    description: 'Utilizamos dispositivos GPS en vehículos y mercancías para el seguimiento en tiempo real de rutas críticas y la geo-localización de personal de respuesta.',
  },
  {
    image: img3, // Replaced missing img5 with img3
    dataAiHint: 'communication radio guard',
    title: 'Comunicación y Respuesta Inmediata',
    description: 'Equipamos a nuestros guardias con radios, smartphones y apps de gestión para una coordinación continua y una respuesta en segundos ante cualquier incidente.',
  },
];

export default function TechSlider() {
  return (
    <section id="tech" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Tecnología de Seguridad Implementada</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Integramos herramientas de punta para mejorar la eficacia de nuestra vigilancia.
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
