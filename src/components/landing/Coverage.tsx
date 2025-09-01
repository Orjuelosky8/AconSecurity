
"use client";

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin } from 'lucide-react';

const locations = [
  { city: 'Bogotá', phone: '601-2533350', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756135187682!5m2!1ses-419!2sco!6m8!1m7!1sIWmgtxGosG_um-binBiz2A!2m2!1d4.68572149786487!2d-74.07032565195475!3f289.5994100138774!4f1.6920683225827702!5f1.5362075765590846', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1988.2422244786485!2d-74.07040409814576!3d4.6855462093220455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9add93864193%3A0xbe86040ead845819!2sAcon%20Security%20Ltda!5e0!3m2!1ses-419!2sco!4v1756097403382!5m2!1ses-419!2sco' },
  { city: 'Cota', phone: '601-2533350', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756134907700!5m2!1ses-419!2sco!6m8!1m7!1sgxTqo-lWCsDmjH21WIULTA!2m2!1d4.809917058050402!2d-74.10096324569186!3f140.39562412442672!4f12.331251193563574!5f0.782086597462746', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496.97075011461914!2d-74.10108899160342!3d4.810194376199249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f86c1d6cbb6c9%3A0x1e73ccfa97d5dd94!2sTv.%204%20%2312%2009%2C%20Cota%2C%20Cundinamarca!5e0!3m2!1ses-419!2sco!4v1756133128532!5m2!1ses-419!2sco' },
  { city: 'Medellín', phone: '604-123-4567', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.109520908757!2d-75.61209132561132!3d6.249296726290297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442982abfe775d%3A0xfd93d5fdc720f0a5!2sCl.%2039%20%23%2088-110%2C%20Santa%20Monica%2C%20Medell%C3%ADn%2C%20La%20Am%C3%A9rica%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1756135370106!5m2!1ses-419!2sco' },
  { city: 'Cali', phone: '602-123-4567', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254900.13223493303!2d-76.69047943810371!3d3.395393148730474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6f0cc4bb3f1%3A0x1f0fb5e952ae6168!2sCali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses-419!2sco!4v1756133087037!5m2!1ses-419!2sco' },
  { city: 'Barranquilla', phone: '605-123-4567', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125334.94255021094!2d-74.97387760163498!3d10.984723977465936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d44d12ae605%3A0x2633844581b917b2!2sBarranquilla%2C%20Atl%C3%A1ntico!5e0!3m2!1ses-419!2sco!4v1756133287625!5m2!1ses-419!2sco' },
  { city: 'Cartagena', phone: '605-123-4568', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125576.54351530463!2d-75.59092797667402!3d10.400357080162365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625e7ae9d1351%3A0xb161392e033f26ca!2sCartagena%20de%20Indias%2C%20Provincia%20de%20Cartagena%2C%20Bol%C3%ADvar!5e0!3m2!1ses-419!2sco!4v1756133356463!5m2!1ses-419!2sco' },
  { city: 'Bucaramanga', phone: '607-123-4567', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63345.040229945145!2d-73.17417800138591!3d7.1184646002597365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e68157af751c0ed%3A0x75a0e4551148c36c!2sBucaramanga%2C%20Santander!5e0!3m2!1ses-419!2sco!4v1756133386896!5m2!1ses-419!2sco' },
  { city: 'Cúcuta', phone: '607-123-4568', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63229.88990217515!2d-72.54562049990156!3d7.908843048082985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e66459c645dd28b%3A0x26736c1ff4db5caa!2sC%C3%BAcuta%2C%20Norte%20de%20Santander!5e0!3m2!1ses-419!2sco!4v1756133435574!5m2!1ses-419!2sco' },
  { city: 'Pereira', phone: '606-123-4567', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63612.71352943684!2d-75.75487200432062!3d4.80529494514368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e388748eb56c1fd%3A0x95b39410f9f1dfbc!2sPereira%2C%20Risaralda!5e0!3m2!1ses-419!2sco!4v1756133470430!5m2!1ses-419!2sco' },
  { city: 'Santa Marta', phone: '605-123-4569', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62614.476113610646!2d-74.22359699098747!3d11.231606559494221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef4f66ff59a173d%3A0x124b95fc153af9b8!2sSanta%20Marta%2C%20Magdalena!5e0!3m2!1ses-419!2sco!4v1756133506646!5m2!1ses-419!2sco' },
  { city: 'Ibagué', phone: '608-123-4567', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127295.76633742549!2d-75.26918012177005!3d4.412456117951606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38c491115f4d5f%3A0xe0cae43859d2401e!2zSWJhZ3XDqSwgVG9saW1h!5e0!3m2!1ses-419!2sco!4v1756133537222!5m2!1ses-419!2sco' },
  { city: 'Pasto', phone: '602-123-4568', srcStreetView: 'https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1756133239033!5m2!1ses-419!2sco!6m8!1m7!1solB_XP46-vjE2n82pdiTVw!2m2!1d6.249223549003107!2d-75.60954557024175!3f46.84507401743202!4f10.830613133339!5f0.4662199846454126', srcMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63822.773205950914!2d-77.31842255470558!3d1.213610950436727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed48761b92a73%3A0x44a368566cc3a522!2zUGFzdG8sIE5hcmnDsW8!5e0!3m2!1ses-419!2sco!4v1756133561639!5m2!1ses-419!2sco' },
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
    
        // Placeholder for Colombia map model. Replace with GLTFLoader and your model in /public/models/map/colombia.glb
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Mapa 3D */}
              {/* <div
                className="
                  w-full 
                  aspect-[4/5] 
                  max-h-[280px] 
                  md:max-h-[420px] 
                  rounded-lg border 
                  bg-background p-2
                  mx-auto
                "
                ref={mountRef}
              /> */}
              <div style={{ width: "100%", height: "450px" }}>
                <iframe
                  src={selectedCity.srcMap}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              {/* Selector ciudades */}
              <div className="flex flex-col gap-4 w-full mt-4 lg:mt-0">
                <Card className="bg-background border-accent/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent">
                      <MapPin /> {selectedCity.city}
                    </CardTitle>
                    <CardDescription>Información de contacto</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`tel:${selectedCity.phone}`}
                      className="flex items-center gap-2 text-lg hover:underline"
                    >
                      <Phone className="h-5 w-5" />
                      <span>{selectedCity.phone}</span>
                    </a>
                  </CardContent>
                </Card>
                <Card className="bg-background">
                  <CardContent className="p-2">
                    <div className="max-h-[260px] overflow-y-auto space-y-1 pr-2 overflow-x-hidden">
                      {locations.map((loc) => (
                        <button
                          key={loc.city}
                          onClick={() => setSelectedCity(loc)}
                          className={`
                            w-full text-left p-3 rounded-md transition-colors text-sm font-medium 
                            ${selectedCity.city === loc.city
                              ? 'bg-primary/90 text-primary-foreground'
                              : 'hover:bg-muted'}
                          `}
                        >
                          {loc.city}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div style={{ width: "100%", height: "450px" }}>
                <iframe
                  src={selectedCity.srcStreetView}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      );
      
}
