import { AconShieldLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Sobre nosotros', href: '#about' },
  { name: 'Servicios', href: '#services' },
  { name: 'Cobertura', href: '#coverage' },
  { name: 'Tecnología', href: '#tech' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a href="#home" className="mr-6 flex items-center space-x-2">
            <AconShieldLogo className="h-7 w-auto" />
          </a>
        </div>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60 font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 hidden md:flex">
            <a href="#contact">Cotiza ahora</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
