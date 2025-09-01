
"use client";

import { useState } from 'react';
import { AconShieldLogo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, MessageSquareHeart } from 'lucide-react';
import Link from 'next/link';
import './../styles/header.css';
import ModelViewer from '@/components/ModelViewer';

const navItems = [
  { name: 'Sobre nosotros', href: '/#about' },
  { name: 'Servicios', href: '/#services' },
  { name: 'Cobertura', href: '/#coverage' },
  { name: 'Tecnología', href: '/#tech' },
  { name: 'Social', href: '/#social' },
];

interface HeaderProps {
  onAssistantClick: () => void;
}

export default function Header({ onAssistantClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileAssistantClick = () => {
    setIsMenuOpen(false);
    onAssistantClick();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-md shadow-lg transition-all border-b border-border/40">
      <div className="container flex items-center h-[60px] md:h-[74px] max-w-screen-2xl px-4 md:px-8">
        {/* Logo con animación */}
        <div className="mr-8 flex items-center">
          <Link
            href="/#home"
            className="flex items-center group hover:scale-105 transition-transform duration-150"
          >
            <div className='w-24 h-16'>
              <ModelViewer src="/models/logo.glb" alt="Acon Shield 3D Logo" rotationPerSecond='30deg' />
            </div>
          </Link>
          <span className="hidden lg:inline-block h-7 w-px mx-6 bg-gradient-to-b from-primary/30 via-primary/60 to-primary/30 rounded-full" />
        </div>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-base font-semibold">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative text-foreground/80 hover:text-primary transition-colors duration-200 px-1 py-0.5 after:content-[''] after:block after:h-[2.5px] after:w-0 after:bg-gradient-to-r after:from-primary after:to-indigo-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Asistente Virtual Desktop */}
          <Button
            onClick={onAssistantClick}
            className="rounded-full shadow-md bg-gradient-to-r from-primary via-indigo-600 to-sky-500 text-primary-foreground font-semibold px-6 py-2 hover:scale-105 transition-transform hidden md:flex text-sm md:text-base"
            style={{
              boxShadow:
                '0 2px 8px 0 rgba(35, 123, 255, 0.14), 0 1.5px 4px 0 rgba(50, 50, 93, 0.07)'
            }}
          >
            <MessageSquareHeart className="mr-2 h-5 w-5 opacity-90" />
            <span className='hidden lg:inline'>Asistente Virtual</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden hover:bg-primary/5">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[90vw] max-w-[380px] bg-background/80 backdrop-blur-xl shadow-2xl border-l border-border animate-slide-in rounded-l-3xl p-0"
            >
              <div className="flex justify-between items-center p-4 border-b border-border/30">
                <div className='w-20 h-12'>
                  <ModelViewer src="/models/logo.glb" alt="Acon Shield 3D Logo" rotationPerSecond='30deg' />
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:bg-primary/10"
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Cerrar menú</span>
                </Button>
              </div>
              <nav className="flex flex-col p-6 space-y-5">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-semibold text-foreground/90 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
                <Button
                  onClick={handleMobileAssistantClick}
                  className="w-full mt-8 bg-gradient-to-r from-primary via-indigo-600 to-sky-500 text-primary-foreground shadow-lg rounded-full font-semibold text-base hover:scale-105 transition-transform"
                >
                  <MessageSquareHeart className="mr-2 h-5 w-5 opacity-90" />
                  Asistente Virtual
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
