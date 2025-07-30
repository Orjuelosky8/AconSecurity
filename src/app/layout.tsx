import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Acon Shield | Protegemos tu mundo',
  description: 'Acon Security ofrece soluciones de seguridad avanzadas con tecnología de punta. Protegemos tu mundo con drones, CCTV con IA, y más. Cotiza ahora.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
