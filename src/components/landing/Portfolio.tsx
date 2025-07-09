"use client";

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, ShieldAlert, Fingerprint, FireExtinguisher, UserSquare2, Bot } from 'lucide-react';

const services = [
  {
    icon: Camera,
    title: 'CCTV con IA',
    description: 'Sistemas de videovigilancia inteligentes que detectan amenazas en tiempo real.',
  },
  {
    icon: ShieldAlert,
    title: 'Sistemas de Intrusión',
    description: 'Alarmas y sensores perimetrales para una protección proactiva de tus instalaciones.',
  },
  {
    icon: Fingerprint,
    title: 'Control de Acceso RFID',
    description: 'Gestión de acceso segura y eficiente mediante tecnología de identificación por radiofrecuencia.',
  },
  {
    icon: FireExtinguisher,
    title: 'Detección de Incendios',
    description: 'Sistemas avanzados para la detección temprana y notificación de incendios.',
  },
  {
    icon: UserSquare2,
    title: 'Guardas de Seguridad y K9',
    description: 'Personal de seguridad altamente capacitado y unidades caninas especializadas.',
  },
  {
    icon: Bot,
    title: 'Vigilancia con Drones',
    description: 'Cobertura de grandes áreas y supervisión remota con nuestra flota de drones de última generación.',
  },
];

export default function Portfolio() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(services[0]);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    // Placeholder materials. A developer can replace these with textures for each service in /public/models/objects/
    const materials = services.map((s, i) => new THREE.MeshStandardMaterial({
        color: new THREE.Color(i % 2 === 0 ? '#0d9488' : '#1f2937'),
        roughness: 0.5, metalness: 0.5
    }));
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.002;
      cube.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if(currentMount) {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section id="services" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Portafolio de Servicios</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Soluciones 360° para cada necesidad de seguridad. Interactúa para conocer más.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="min-h-[350px] md:min-h-[450px]" ref={mountRef} />
          <div className="flex flex-col gap-4">
            <Card className="bg-card border-accent/20 shadow-lg min-h-[180px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-accent">
                        <activeService.icon className="h-8 w-8" />
                        <span className="text-2xl">{activeService.title}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground">{activeService.description}</p>
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {services.map((service, index) => (
                    <Button 
                        key={service.title}
                        variant={activeService.title === service.title ? "default" : "secondary"}
                        onClick={() => setActiveService(services[index])}
                        className="flex items-center justify-start gap-2 text-left h-12"
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
