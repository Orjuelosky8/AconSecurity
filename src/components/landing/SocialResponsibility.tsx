import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Globe, Users } from 'lucide-react';

import img1 from './../media/responsabilidadSocial1.png';
import img2 from './../media/responsabilidadSocial2.jpg';
import img3 from './../media/responsabilidadSocial3.png';

const programs = [
  {
    icon: Heart,
    title: 'Programa Sanar',
    description: 'Apoyamos la recuperación y el bienestar de niños con cáncer, aportando a su tratamiento y calidad de vida.',
    image: img1,
    dataAiHint: 'charity donation'
  },
  {
    icon: Globe,
    title: 'Donaciones a UNICEF',
    description: 'Contribuimos con UNICEF para proteger los derechos de los niños en Colombia y en todo el mundo.',
    image: img2,
    dataAiHint: 'children playing'
  },
  {
    icon: Users,
    title: 'Fundación Colombia Chiquita',
    description: 'Fomentamos el desarrollo y la educación en comunidades vulnerables a través de esta valiosa fundación.',
    image: img3,
    dataAiHint: 'community building'
  },
];

export default function SocialResponsibility() {
  return (
    <section id="social" className="relative py-20 sm:py-32 overflow-hidden">
       <div className="absolute inset-0">
        <Image 
          src="https://placehold.co/1920x1080.png"
          alt="Community support background"
          fill
          style={{ objectFit: 'cover' }}
          className="bg-fixed"
          data-ai-hint="community people"
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Responsabilidad Social</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Creemos en un futuro más seguro y próspero para todos.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Card key={program.title} className="bg-card/70 backdrop-blur-sm border-primary/20 shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col overflow-hidden">
              <div className="relative h-48 w-full">
                  <Image src={program.image} alt={program.title} fill style={{objectFit: 'cover'}} data-ai-hint={program.dataAiHint}/>
              </div>
              <div className="flex flex-col p-6 flex-grow">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="flex items-center gap-2">
                    <program.icon className="text-primary h-6 w-6" />
                    <span className="text-xl">{program.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <p className="text-muted-foreground">{program.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
