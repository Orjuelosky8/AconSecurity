
"use client";

import { useState } from 'react';
import { AconShieldLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Sobre nosotros', href: '#about' },
  { name: 'Servicios', href: '#services' },
  { name: 'Cobertura', href: '#coverage' },
  { name: 'Tecnología', href: '#tech' },
  { name: 'Social', href: '#social' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a href="#home" className="mr-6 flex items-center space-x-2">
            <AconShieldLogo className="h-7 w-auto" />
          </a>
        </div>
        
        {/* Desktop Navigation */}
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
            <a href="#assistant">Asistente Virtual</a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="flex justify-between items-center p-4 border-b">
                 <AconShieldLogo className="h-7 w-auto" />
                 <Button variant="ghost" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Cerrar menú</span>
                 </Button>
              </div>
              <nav className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <Button asChild className="w-full mt-4" onClick={() => setIsMenuOpen(false)}>
                  <a href="#assistant">Asistente Virtual</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
