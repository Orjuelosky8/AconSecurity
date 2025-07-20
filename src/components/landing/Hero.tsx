
// "use client";
// import { useEffect, useRef } from "react";
// import './../styles/carrusel.css';

// import Image from 'next/image';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';
// import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
// import { Button } from '@/components/ui/button';

// const slides = [
//   {
//     image: 'https://placehold.co/1920x1080.png',
//     dataAiHint: 'security personnel industry',
//     title: '50 años trabajando por la tranquilidad y seguridad de Colombia',
//     description: 'El compromiso con la seguridad ha sido clave para nuestro crecimiento.',
//     ctaText: 'Conoce más',
//     ctaLink: '#about',
//   },
//   {
//     image: `https://placehold.co/1920x1080/00FF00/000000.png?text=Slide+2`,
//     dataAiHint: 'technology surveillance center',
//     title: 'Tecnología de Vanguardia para tu Protección',
//     description: 'Integramos drones, IA y sistemas de monitoreo para una seguridad proactiva.',
//     ctaText: 'Ver tecnología',
//     ctaLink: '#tech',
//   },
//   {
//     image: `https://placehold.co/1920x1080/0000FF/FFFFFF.png?text=Slide+3`,
//     dataAiHint: 'security guard smiling',
//     title: 'Cobertura Nacional, Confianza Local',
//     description: 'Con 11 sedes en todo el país, estamos siempre cerca para protegerte.',
//     ctaText: 'Nuestras sedes',
//     ctaLink: '#coverage',
//   },
// ];

// export default function Hero() {
//   const autoplay = Autoplay({ delay: 6000, stopOnInteraction: false });

//   // useEffect(() => {
//   //   if (!autoplay.current) {
//   //     autoplay.current = Autoplay({ delay: 6000, stopOnInteraction: false });
//   //   }
//   // }, []);
//   console.log("El numero de slides en el carrusel es de: " + slides.length);
//   return (
//     <section id="home" className="relative w-full text-white overflow-hidden">
//       <Carousel
//         className="w-full h-full"
//         opts={{
//           loop: true,
//           // align: "start",
//           //slidesToShow: 1, // Asegúrate de que el carrusel se configura para mostrar solo 1 slide a la vez
//           //slidesToScroll: 1, // Se mueve un solo slide a la vez
//           //skipSnaps: false,
//         }}
//         plugins={[autoplay]}
//       >
//         <CarouselContent className="h-full">
//           {slides.map((slide, index) => (
//             <CarouselItem key={index} className="relative h-[85vh] basis-full w-full">
//               <div className="relative h-full w-full">
//                 <Image
//                   src={slide.image}
//                   alt={slide.title}
//                   fill
//                   className="object-cover"
//                   data-ai-hint={slide.dataAiHint}
//                   priority={index === 0}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
//                 <div className="absolute inset-0 flex items-center z-20">
//                   <div className="container mx-auto px-4">
//                     <div className="max-w-md ml-[50px] mt-[-100px]">
//                       <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-shadow-lg leading-tight">
//                         {slide.title}
//                       </h1>
//                       <p className="mt-4 max-w-xl text-lg text-foreground/80">
//                         {slide.description}
//                         {slides[2].description}
//                       </p>
//                       <Button asChild size="lg" className="mt-8">
//                         <a href={slide.ctaLink}>{slide.ctaText}</a>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white hidden md:flex z-30" />
//         <CarouselNext onClick={() => {
//           console.log("Next button clicked");
//         }} disabled={false}
//           className="absolute right-4 top-1/2 -translate-y-1/2 text-white hidden md:flex z-30" />
//       </Carousel>
//     </section>

//   );
// }
"use client";

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

console.log("Hola1 ");
const autoplay = Autoplay({ delay: 6000, stopOnInteraction: false });
console.log("Hola2 " + autoplay);

const slides = [
  {
    image: 'https://placehold.co/1920x1080.png',
    title: '50 años trabajando por la tranquilidad y seguridad de Colombia',
    description: 'El compromiso con la seguridad ha sido clave para nuestro crecimiento.',
    ctaText: 'Conoce más',
    ctaLink: '#about',
  },
  {
    image: 'https://placehold.co/1920x1080/00FF00/000000.png?text=Slide+2',
    title: 'Tecnología de Vanguardia para tu Protección',
    description: 'Integramos drones, IA y sistemas de monitoreo para una seguridad proactiva.',
    ctaText: 'Ver tecnología',
    ctaLink: '#tech',
  },
  {
    image: 'https://placehold.co/1920x1080/0000FF/FFFFFF.png?text=Slide+3',
    title: 'Cobertura Nacional, Confianza Local',
    description: 'Con 11 sedes en todo el país, estamos siempre cerca para protegerte.',
    ctaText: 'Nuestras sedes',
    ctaLink: '#coverage',
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
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="container mx-auto px-4">
                    <div className="max-w-md ml-[50px] mt-[-100px]">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white hidden md:flex z-30" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white hidden md:flex z-30" />
      </Carousel>
    </section>
  );
}
