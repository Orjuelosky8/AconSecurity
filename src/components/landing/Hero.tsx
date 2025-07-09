
"use client";

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x111111, 0.1);

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    
    let model: THREE.Group;
    const loader = new GLTFLoader();
    loader.load(
        '/models/Acon Security 3d.glb',
        (gltf) => {
            model = gltf.scene;
            model.scale.set(500, 500, 500);
            model.position.y = -1; // Ajustado para bajar el logo
            
            const goldMaterial = new THREE.MeshStandardMaterial({
                color: 0xffd700,
                metalness: 0.9,
                roughness: 0.3,
            });

            model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = goldMaterial;
                }
            });

            scene.add(model);
        },
        undefined,
        (error) => {
            console.error('An error happened while loading the model:', error);
            // Fallback a un objeto visible si el modelo no carga
            const droneGeometry = new THREE.BoxGeometry(1.2, 0.2, 2.5);
            const droneMaterial = new THREE.MeshStandardMaterial({ 
              color: 0x0d9488, 
              roughness: 0.4, 
              metalness: 0.9,
              emissive: 0x0d9488,
              emissiveIntensity: 0.1
            });
            const drone = new THREE.Mesh(droneGeometry, droneMaterial);
            scene.add(drone);
        }
    );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0xffb200, 30, 100);
    pointLight.position.set(-5, -2, 3);
    scene.add(pointLight);

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    document.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (model) {
        model.rotation.y = elapsedTime * 0.2;
        model.position.y = Math.sin(elapsedTime * 0.7) * 0.3 - 1;
      }
      
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.8 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (currentMount) {
          currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden">
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-[1]" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-shadow-lg leading-tight">
          Protegemos tu mundo
        </h1>
        <p className="mt-4 max-w-xl text-md sm:text-lg md:text-xl text-foreground/80">
          Soluciones de seguridad integrales con tecnología de vanguardia para tu tranquilidad.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-7 px-10 sm:px-12 rounded-full shadow-lg shadow-accent/20 transform hover:scale-105 transition-transform duration-300">
          <a href="#contact">Cotiza ahora</a>
        </Button>
      </div>
    </section>
  );
}
