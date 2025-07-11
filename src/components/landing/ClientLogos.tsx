"use client";

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

const clients = [
  { name: 'Empresa A', logoUrl: 'https://placehold.co/150x60.png?text=Empresa+A', website: '#', dataAiHint: 'company logo' },
  { name: 'Empresa B', logoUrl: 'https://placehold.co/150x60.png?text=Empresa+B', website: '#', dataAiHint: 'business logo' },
  { name: 'Empresa C', logoUrl: 'https://placehold.co/150x60.png?text=Empresa+C', website: '#', dataAiHint: 'corporate logo' },
  { name: 'Empresa D', logoUrl: 'https://placehold.co/150x60.png?text=Empresa+D', website: '#', dataAiHint: 'brand logo' },
  { name: 'Empresa E', logoUrl: 'https://placehold.co/150x60.png?text=Empresa+E', website: '#', dataAiHint: 'company logo' },
  { name: 'Empresa F', logoUrl: 'https://placehold.co/150x60.png?text=Empresa+F', website: '#', dataAiHint: 'business logo' },
  { name: 'Empresa G', logoUrl: 'https://placehold.co/150x60.png?text=Empresa+G', website: '#', dataAiHint: 'corporate logo' },
  { name: 'Empresa H', logoUrl: 'https://placehold.co/150x60.png?text=Empresa+H', website: '#', dataAiHint: 'brand logo' },
];

export default function ClientLogos() {
  return (
    <section id="clients" className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
            <h3 className="font-semibold text-lg text-muted-foreground">Empresas que confían en nosotros</h3>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            })
          ]}
          className="w-full"
        >
          <CarouselContent>
            {clients.map((client, index) => (
              <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                <div className="p-4">
                  <a href={client.website} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center h-full">
                    <Image
                      src={client.logoUrl}
                      alt={`Logo de ${client.name}`}
                      width={150}
                      height={60}
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      data-ai-hint={client.dataAiHint}
                    />
                  </a>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
