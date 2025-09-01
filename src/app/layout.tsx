// import type { Metadata } from 'next';
// import './globals.css';
// import { Toaster } from '@/components/ui/toaster';
// import Script from 'next/script';

// export const metadata: Metadata = {
//   title: 'Acon Shield | Protegemos tu mundo',
//   description: 'Acon Security ofrece soluciones de seguridad avanzadas con tecnología de punta. Protegemos tu mundo con drones, CCTV con IA, y más. Cotiza ahora.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="es" className="dark scroll-smooth">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> 
//         <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        
//         {/* Model Viewer Scripts */}
//         <Script src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js" type="module" strategy="beforeInteractive" />
//         {/* Bitch <Script src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer-legacy.js" noModule strategy="beforeInteractive" /> */}
//       </head>
//       <body className="font-body antialiased">
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }
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
