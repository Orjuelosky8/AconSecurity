
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ShieldAlert, Fingerprint, FireExtinguisher, UserSquare2, Bot } from 'lucide-react';
import ModelViewer from '@/components/ModelViewer';

const services = [
  {
    icon: Bot,
    title: 'Vigilancia con Drones',
    description: 'Cobertura de grandes áreas y supervisión remota con nuestra flota de drones de última generación.',
    modelUrl: '/models/services/drone.glb', // Example path
    iosModelUrl: '', // Optional: for different iOS model
  },
  {
    icon: Camera,
    title: 'CCTV con IA',
    description: 'Sistemas de videovigilancia inteligentes que detectan amenazas en tiempo real.',
    modelUrl: '/models/services/cctv.glb',
    iosModelUrl: '',
  },
  {
    icon: ShieldAlert,
    title: 'Sistemas de Intrusión',
    description: 'Alarmas y sensores perimetrales para una protección proactiva de tus instalaciones.',
    modelUrl: '/models/services/alarm.glb',
    iosModelUrl: '',
  },
  {
    icon: Fingerprint,
    title: 'Control de Acceso RFID',
    description: 'Gestión de acceso segura y eficiente mediante tecnología de identificación por radiofrecuencia.',
    modelUrl: '/models/services/rfid.glb',
    iosModelUrl: '',
  },
  {
    icon: FireExtinguisher,
    title: 'Detección de Incendios',
    description: 'Sistemas avanzados para la detección temprana y notificación de incendios.',
    modelUrl: '/models/services/fire_detector.glb',
    iosModelUrl: '',
  },
  {
    icon: UserSquare2,
    title: 'Guardas de Seguridad',
    description: 'Personal de seguridad altamente capacitado para proteger tus instalaciones.',
    modelUrl: '/models/services/security_guard.glb',
    iosModelUrl: '',
  },
];

export default function Portfolio() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section id="services" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Portafolio de Servicios</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Soluciones 360° para cada necesidad de seguridad. Interactúa para conocer más.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* 3D Model Viewer - Placed first for mobile flow */}
          <div className="md:order-last min-h-[350px] sm:min-h-[450px] w-full aspect-square md:aspect-auto rounded-lg bg-card border flex items-center justify-center p-2 shadow-inner">
            <ModelViewer
              src={activeService.modelUrl}
              iosSrc={activeService.iosModelUrl}
              alt={activeService.title}
            />
          </div>

          {/* Service Details and Buttons */}
          <div className="flex flex-col gap-6">
            <Card className="bg-card border-accent/20 shadow-lg min-h-[160px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-accent">
                        <activeService.icon className="h-7 w-7 sm:h-8 sm:w-8" />
                        <span className="text-xl sm:text-2xl">{activeService.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-base sm:text-lg text-muted-foreground">{activeService.description}</p>
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {services.map((service) => (
                    <Button 
                        key={service.title}
                        variant={activeService.title === service.title ? "default" : "secondary"}
                        onClick={() => setActiveService(service)}
                        className="flex items-center justify-start gap-2 text-left h-12 text-xs sm:text-sm"
                    >
                        <service.icon className="h-4 w-4 flex-shrink-0" />
                        <span>{service.title}</span>
                    </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
