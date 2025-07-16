
"use client";
import { useRef } from "react";
import './../styles/carrusel.css';

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
  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  return (
    <section id="home" className="relative min-h-[85vh] h-full w-full text-white">
      <Carousel 
        className="absolute w-full h-full"
        opts={{ loop: true }}
        plugins={[autoplay.current]}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full relative">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                data-ai-hint={slide.dataAiHint}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center z-10">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white hidden md:flex z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white hidden md:flex z-10" />
      </Carousel>
    </section>
  );
}
