"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Building, FileText } from 'lucide-react';
import './../styles/aboutUs.css';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    icon: FileText,
    title: 'Constitución Legal',
    description: 'Fundada en 2010, Acon Security es una empresa legalmente constituida bajo las leyes colombianas, garantizando transparencia y confianza.',
  },
  {
    icon: CheckCircle,
    title: 'Póliza de Responsabilidad Civil',
    description: 'Contamos con una robusta Póliza de Responsabilidad Civil Extracontractual que ampara todos nuestros servicios y operaciones.',
  },
  {
    icon: Building,
    title: '11 Sedes a Nivel Nacional',
    description: 'Nuestra presencia en 11 ciudades principales del país nos permite ofrecer una cobertura y respuesta rápida en todo el territorio colombiano.',
  },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      timelineRefs.current.forEach((el) => {
        if (!el) return;
        gsap.from(el, {
          autoAlpha: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Nuestra Trayectoria</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {/* Compromiso, legalidad y cobertura que nos respaldan. */}
            De escoltas a soluciones de riesgo integral.
          </p>
        </div>
        <div className="flex trayectoria-container">
          <div className="timeline-container relative max-w-xl mx-auto">
            <div className="absolute left-6 top-0 h-[66%] w-0.5 bg-border -translate-x-1/2"></div>
            {timelineData.map((item, index) => (
              <div 
                key={index} 
                ref={el => { if(el) timelineRefs.current[index] = el; }} 
                className="relative pl-16 pb-12"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2">
                  <div className="flex items-center justify-center w-12 h-12 color3 rounded-full ring-8 ring-card text-primary-foreground">
                    <item.icon className="h-6 w-6" />
                  </div>
                </div>
                <Card className="bg-background border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className='video'>
            <iframe src="https://www.youtube.com/embed/aOl3rOxLjS0?si=cH9TiyyNU7Hx-DMe" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
