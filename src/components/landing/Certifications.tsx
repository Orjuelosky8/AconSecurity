"use client";

import Image from 'next/image';

const certifications = [
  { name: 'Certificación ISO 9001', logoUrl: 'https://placehold.co/180x120.png', dataAiHint: 'certificate badge' },
  { name: 'Certificación OHSAS 18001', logoUrl: 'https://placehold.co/180x120.png', dataAiHint: 'award seal' },
  { name: 'Certificación BASC', logoUrl: 'https://placehold.co/180x120.png', dataAiHint: 'certification logo' },
  { name: 'Sello de Calidad', logoUrl: 'https://placehold.co/180x120.png', dataAiHint: 'quality seal' },
  { name: 'Certificación Ambiental', logoUrl: 'https://placehold.co/180x120.png', dataAiHint: 'eco certificate' },
  { name: 'SuperVigilancia', logoUrl: 'https://placehold.co/180x120.png', dataAiHint: 'government seal' },
  { name: 'ICONTEC', logoUrl: 'https://placehold.co/180x120.png', dataAiHint: 'standardization logo' },
  { name: 'SGS', logoUrl: 'https://placehold.co/180x120.png', dataAiHint: 'inspection certification' },
];

const duplicatedCerts = [...certifications, ...certifications, ...certifications, ...certifications];

export default function Certifications() {
  return (
    <section id="certifications" className="py-12 sm:py-16 bg-background">
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll-x">
          {duplicatedCerts.map((cert, index) => (
            <div key={index} className="flex-shrink-0 mx-8 flex flex-col items-center justify-center">
                <Image
                  src={cert.logoUrl}
                  alt={`Logo de ${cert.name}`}
                  width={150}
                  height={100}
                  className="object-contain"
                  data-ai-hint={cert.dataAiHint}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
