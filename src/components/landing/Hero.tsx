
"use client";

import Image from 'next/image';

import img1 from './../media/hero1.jpg';
import img2 from './../media/mapprovisional.jpg';
import img3 from './../media/hero3.jpg';
import img4 from './../media/hero4.jpg';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Button } from '@/components/ui/button';

const autoplay = Autoplay({ delay: 4000, stopOnInteraction: false });

const slides = [
  {
    image: img1,
    title: 'Servimos con Vocación: Seguridad y Confianza desde 1996',
    description: 'Décadas de experiencia protegiendo hogares, empresas y conjuntos residenciales en toda Colombia.',
    ctaText: 'Conoce más',
    ctaLink: '#about',
  },
  {
    image: img2,
    title: 'Cobertura Nacional, Respaldo Local',
    description: 'Con presencia en las principales ciudades, estamos siempre cerca para brindarte la protección que necesitas.',
    ctaText: 'Nuestras sedes',
    ctaLink: '#coverage',
  },
  {
    image: img3,
    title: 'Tecnología de Vanguardia para tu Protección',
    description: 'Integramos CCTV, alarmas inteligentes y control de acceso para una seguridad proactiva y eficiente.',
    ctaText: 'Ver tecnología',
    ctaLink: '#tech',
  },
  {
    image: img4,
    title: 'Seguridad Integral a tu Alcance',
    description: 'Desde vigilancia física hasta monitoreo 24/7, ofrecemos soluciones a la medida de tus necesidades.',
    ctaText: 'Ver Servicios',
    ctaLink: '#services',
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative w-full text-white overflow-hidden min-h-[85vh]">
      <Carousel
        className="w-full h-full"
        opts={{ 
          loop: true,
          skipSnaps: true
         }}
        plugins={[autoplay]}  
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-[85vh] basis-full w-full">
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="container mx-auto px-4">
                    <div className="max-w-xl ml-0 md:ml-[50px] mt-[-100px]">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-shadow-lg leading-tight">
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
        <CarouselPrevious className="absolute left-4 top-1/2 text-white hidden md:flex z-30" />
        <CarouselNext className="absolute right-4 top-1/2 text-white hidden md:flex z-30" />
      </Carousel>
    </section>
  );
}
