"use client";

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin } from 'lucide-react';

const locations = [
  { city: 'Bogotá', phone: '601-123-4567' },
  { city: 'Medellín', phone: '604-123-4567' },
  { city: 'Cali', phone: '602-123-4567' },
  { city: 'Barranquilla', phone: '605-123-4567' },
  { city: 'Cartagena', phone: '605-123-4568' },
  { city: 'Bucaramanga', phone: '607-123-4567' },
  { city: 'Cúcuta', phone: '607-123-4568' },
  { city: 'Pereira', phone: '606-123-4567' },
  { city: 'Santa Marta', phone: '605-123-4569' },
  { city: 'Ibagué', phone: '608-123-4567' },
  { city: 'Pasto', phone: '602-123-4568' },
];

export default function Coverage() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [selectedCity, setSelectedCity] = useState(locations[0]);

    useEffect(() => {
        if (typeof window === 'undefined' || !mountRef.current) return;
        const currentMount = mountRef.current;
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.set(0, 1.5, 3);
        camera.lookAt(0,0,0);
    
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);
    
        // Placeholder for Colombia map model. A developer can replace this with a GLTFLoader.
        const mapGeometry = new THREE.PlaneGeometry(3, 4);
        const mapMaterial = new THREE.MeshStandardMaterial({ color: 0x085f58, flatShading: true });
        const mapPlane = new THREE.Mesh(mapGeometry, mapMaterial);
        mapPlane.rotation.x = -Math.PI / 2;
        scene.add(mapPlane);

        // Placeholder for location pins. A developer can map these to actual coordinates on the model.
        locations.forEach(() => {
            const pinGeometry = new THREE.ConeGeometry(0.04, 0.15, 8);
            const pinMaterial = new THREE.MeshStandardMaterial({ color: 0xffb200, emissive: 0xffb200, emissiveIntensity: 0.5 });
            const pin = new THREE.Mesh(pinGeometry, pinMaterial);
            pin.position.set((Math.random() - 0.5) * 2, 0.075, (Math.random() - 0.5) * 3);
            pin.rotation.x = Math.PI / 2;
            scene.add(pin);
        });
    
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(2, 5, 3);
        scene.add(directionalLight);
    
        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);
          scene.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
          renderer.render(scene, camera);
        };
        animate();
    
        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
          if (currentMount) {
            currentMount.removeChild(renderer.domElement);
          }
        };
      }, []);

  return (
    <section id="coverage" className="py-20 sm:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-primary">Cobertura Nacional</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Estamos donde nos necesitas. Conoce nuestras sedes y contáctanos.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 min-h-[400px] md:min-h-[500px] rounded-lg border bg-background p-2" ref={mountRef}/>
            <div className="flex flex-col gap-4">
                <Card className="bg-background border-accent/20 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-accent">
                            <MapPin /> {selectedCity.city}
                        </CardTitle>
                        <CardDescription>Información de contacto</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <a href={`tel:${selectedCity.phone}`} className="flex items-center gap-2 text-lg hover:underline">
                            <Phone className="h-5 w-5" />
                            <span>{selectedCity.phone}</span>
                        </a>
                    </CardContent>
                </Card>
                <Card className="bg-background">
                  <CardContent className="p-2">
                    <div className="max-h-[260px] overflow-y-auto space-y-1 pr-2">
                        {locations.map((loc) => (
                            <button key={loc.city} onClick={() => setSelectedCity(loc)}
                                className={`w-full text-left p-3 rounded-md transition-colors text-sm font-medium ${selectedCity.city === loc.city ? 'bg-primary/90 text-primary-foreground' : 'hover:bg-muted'}`}
                            >
                                {loc.city}
                            </button>
                        ))}
                    </div>
                  </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
