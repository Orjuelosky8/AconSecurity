import { AconShieldLogo } from '@/components/icons/logo';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

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
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Logo y Descripción */}
          <div className="md:col-span-1 space-y-4">
            <AconShieldLogo />
            <p className="text-sm text-muted-foreground">
              Protegiendo tu mundo con tecnología de vanguardia y un equipo humano comprometido.
            </p>
          </div>
          
          {/* Columna 2: Navegación */}
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
          
          {/* Columna 3: Contacto */}
          <div>
             <h3 className="font-semibold text-primary mb-4">Contacto</h3>
             <address className="not-italic text-sm text-muted-foreground space-y-2">
                <p>Oficina Principal, Bogotá, Colombia</p>
                <p>Tel: (601) 123-4567</p>
             </address>
          </div>
          
          {/* Columna 4: Redes Sociales */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
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
