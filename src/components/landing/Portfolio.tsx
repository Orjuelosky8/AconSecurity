
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import img1 from './../media/necesidades1.jpg';
import img2 from './../media/necesidades2.jpg';
import img3 from './../media/necesidades3.jpeg';
import img4 from './../media/necesidades4.png';
import img5 from './../media/necesidades5.jpg';

const services = [
  {
    title: 'Protegemos tu hogar con la mejor tecnología',
    description: 'Soluciones integrales para mantener tu casa segura y conectada, desde alarmas inteligentes hasta CCTV.',
    image: img1,
    dataAiHint: 'family home security',
    link: '#',
    className: 'lg:row-span-2',
  },
  {
    title: 'Te protegemos en todo momento',
    description: 'Servicios de acompañamiento y respuesta inmediata para que te sientas seguro dondequiera que estés.',
    image: img2,
    dataAiHint: 'nightlife security',
    link: '#',
  },
  {
    title: 'Te cuidamos incluso fuera de tu hogar',
    description: 'Con nuestro botón SOS y la app Acon Shield, la ayuda está a un solo toque de distancia.',
    image: img3,
    dataAiHint: 'personal safety app',
    link: '#',
  },
  {
    title: 'Rapidez ante una intrusión',
    description: 'Nuestro equipo de motorizados garantiza la llegada más rápida ante cualquier emergencia.',
    image: img4,
    dataAiHint: 'emergency response motorcycle',
    link: '#',
  },
  {
    title: 'Expertos y profesionales en seguridad',
    description: 'Monitoreo 24/7 desde nuestro centro de control con personal altamente capacitado y tecnología de punta.',
    image: img5,
    dataAiHint: 'security control room',
    link: '#',
  },
];

export default function Portfolio() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Soluciones para cada necesidad</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Descubre cómo nuestra tecnología y equipo humano trabajan para tu tranquilidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link href={service.link} key={service.title} className={`group relative block overflow-hidden rounded-xl ${service.className}`}>
              <div className="relative h-full w-full min-h-[300px] lg:min-h-[400px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  data-ai-hint={service.dataAiHint}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-primary/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-bold text-white text-shadow-lg">
                    {service.title}
                  </h3>
                  
                  <div className="mt-4 transition-all duration-500 ease-in-out transform opacity-0 group-hover:opacity-100">
                    <p className="text-primary-foreground/90">{service.description}</p>
                    <div className="mt-4 flex items-center font-semibold text-accent">
                      Conoce más <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
