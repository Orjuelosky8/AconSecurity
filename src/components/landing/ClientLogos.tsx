
"use client";

import Image from 'next/image';

import img1 from './../media/logos/logo-bancolombia.svg';
import img2 from './../media/logos/logo-avianca.png';
import img3 from './../media/logos/logo-colpatria.png';
import img4 from './../media/logos/logo-constructoraVIS.png';
import img5 from './../media/logos/logo-enel.png';
import img6 from './../media/logos/logo-federacionNacionalCafeterosColombia.png';
import img7 from './../media/logos/logo-nestle.png';

const clients = [
  { name: 'Empresa A', logoUrl: img1, website: '#', dataAiHint: 'company logo' },
  { name: 'Empresa B', logoUrl: img2, website: '#', dataAiHint: 'business logo' },
  { name: 'Empresa C', logoUrl: img3, website: '#', dataAiHint: 'corporate logo' },
  { name: 'Empresa D', logoUrl: img4, website: '#', dataAiHint: 'brand logo' },
  { name: 'Empresa E', logoUrl: img5, website: '#', dataAiHint: 'company logo' },
  { name: 'Empresa F', logoUrl: img6, website: '#', dataAiHint: 'company logo' },
  { name: 'Empresa G', logoUrl: img7, website: '#', dataAiHint: 'business logo' },
];

const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

export default function ClientLogos() {
  return (
    <section id="clients" className="py-12 bg-muted/30 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Nuestros Protegidos</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Confían en nuestra tecnología y servicio para su seguridad.
          </p>
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-x">
          {duplicatedClients.map((client, index) => (
            <div key={index} className="flex-shrink-0 mx-8">
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
          ))}
        </div>
      </div>
    </section>
  );
}
