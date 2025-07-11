"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current.children, {
          autoAlpha: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section id="certifications" ref={sectionRef} className="py-20 sm:py-24 bg-background">
       <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Nuestras Certificaciones</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Comprometidos con los más altos estándares de calidad y seguridad.
          </p>
        </div>
      </div>
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
