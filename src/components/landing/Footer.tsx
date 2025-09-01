import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import ModelViewer from '@/components/ModelViewer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

const navLinks = [
    { name: 'Sobre Nosotros', href: '/#about' },
    { name: 'Servicios', href: '/#services' },
    { name: 'Cobertura', href: '/#coverage' },
    { name: 'Tecnología', href: '/#tech' },
];

export default function Footer() {
  return (
    <footer className="border-t bg-card text-card-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Desktop Footer */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
          {/* Columna Izquierda: Navegación y Contacto */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-8">
            <div>
              <h3 className="font-semibold text-primary mb-4">Navegación</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                   <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {link.name}
                      </Link>
                   </li>
                ))}
              </ul>
            </div>
            <div>
               <h3 className="font-semibold text-primary mb-4">Contacto</h3>
               <address className="not-italic text-sm text-muted-foreground space-y-2">
                  <div className='flex items-center justify-center lg:justify-end gap-2'>
                    <MapPin size={14}/>
                    <span>Cra. 64 #94A-59, Bogotá</span>
                  </div>
                  <div className='flex items-center justify-center lg:justify-end gap-2'>
                    <Phone size={14}/>
                    <span>(601) 123-4567</span>
                  </div>
               </address>
            </div>
          </div>
          
          {/* Columna Central: Modelo 3D */}
          <div className="flex justify-center items-center order-first lg:order-none">
            <div className="w-48 h-48 lg:w-56 lg:h-56">
               <ModelViewer src="/models/logo.glb" alt="Acon Shield 3D Logo" />
            </div>
          </div>
          
          {/* Columna Derecha: Redes Sociales */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <h3 className="font-semibold text-primary mb-4">Síguenos</h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-background rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-primary/30"
                >
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden flex flex-col items-center text-center space-y-12">
           <div className="w-40 h-40">
               <ModelViewer src="/models/logo.glb" alt="Acon Shield 3D Logo" />
            </div>
            
            <div className="w-full max-w-sm">
                 <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='font-semibold text-primary'>Navegación</AccordionTrigger>
                        <AccordionContent>
                             <ul className="space-y-3 pt-2">
                                {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className='font-semibold text-primary'>Contacto</AccordionTrigger>
                        <AccordionContent>
                             <address className="not-italic text-sm text-muted-foreground space-y-3 pt-2">
                                <div className='flex items-center justify-center gap-2'>
                                    <MapPin size={14}/>
                                    <span>Cra. 64 #94A-59, Bogotá</span>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <Phone size={14}/>
                                    <span>(601) 123-4567</span>
                                </div>
                            </address>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="flex flex-col items-center space-y-4">
                <h3 className="font-semibold text-primary">Síguenos</h3>
                <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((social) => (
                    <Link 
                    key={social.name} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-background rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-primary/30"
                    >
                        <social.icon className="h-6 w-6" />
                        <span className="sr-only">{social.name}</span>
                    </Link>
                ))}
                </div>
            </div>
        </div>
      </div>
      <div className="border-t bg-background">
         <div className="container mx-auto px-4 py-4">
            <p className="text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Acon Security. Todos los derechos reservados.
            </p>
        </div>
      </div>
    </footer>
  );
}
