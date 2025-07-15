
"use client";

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';

const slides = [
  {
    image: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'security personnel industry',
    title: '50 años trabajando por la tranquilidad y seguridad de Colombia',
    description: 'El compromiso con la seguridad ha sido clave para nuestro crecimiento.',
    ctaText: 'Conoce más',
    ctaLink: '#about',
  },
  {
    image: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'technology surveillance center',
    title: 'Tecnología de Vanguardia para tu Protección',
    description: 'Integramos drones, IA y sistemas de monitoreo para una seguridad proactiva.',
    ctaText: 'Ver tecnología',
    ctaLink: '#tech',
  },
  {
    image: 'https://placehold.co/1920x1080.png',
    dataAiHint: 'security guard smiling',
    title: 'Cobertura Nacional, Confianza Local',
    description: 'Con 11 sedes en todo el país, estamos siempre cerca para protegerte.',
    ctaText: 'Nuestras sedes',
    ctaLink: '#coverage',
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative h-[85vh] w-full text-white">
      <Carousel 
        className="w-full h-full"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  data-ai-hint={slide.dataAiHint}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-md text-left">
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-shadow-lg leading-tight">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-xl text-lg text-foreground/80">
                        {slide.description}
                      </p>
                      <Button asChild size="lg" className="mt-8">
                        <a href={slide.ctaLink}>{slide.ctaText}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white hidden md:flex" />
      </Carousel>
    </section>
  );
}
