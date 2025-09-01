
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
    title: 'Vigilancia Fija y Control de Acceso',
    description: 'Protección permanente con guardias capacitados para resguardar la integridad de personas y bienes en un punto determinado.',
    image: img1,
    dataAiHint: 'security guard reception',
    link: '#',
    className: 'lg:row-span-2',
  },
  {
    title: 'Vigilancia Móvil y Patrullaje',
    description: 'Cobertura de áreas extensas mediante rondas constantes en vehículos para una supervisión y respuesta rápida.',
    image: img2,
    dataAiHint: 'security vehicle patrol',
    link: '#',
  },
  {
    title: 'Escolta de Mercancías en Tránsito',
    description: 'Protección armada de bienes y carga durante su transporte para prevenir robos y asegurar su llegada a destino.',
    image: img3,
    dataAiHint: 'cargo truck security',
    link: '#',
  },
  {
    title: 'Seguridad Electrónica y Monitoreo 24/7',
    description: 'Nuestra central supervisa cámaras, alarmas y sensores en tiempo real para una respuesta inmediata ante cualquier evento.',
    image: img4,
    dataAiHint: 'security control room',
    link: '#',
  },
  {
    title: 'Escolta a Personas y Ejecutivos',
    description: 'Servicio de protección personal especializada para garantizar la integridad física en desplazamientos y actividades diarias.',
    image: img5,
    dataAiHint: 'bodyguard executive protection',
    link: '#',
  },
];

export default function Portfolio() {
  return (
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
