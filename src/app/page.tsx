
"use client";

import { useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import ClientLogos from '@/components/landing/ClientLogos';
import AboutUs from '@/components/landing/AboutUs';
import Certifications from '@/components/landing/Certifications';
import Portfolio, { services, type Service } from '@/components/landing/Portfolio';
import Coverage from '@/components/landing/Coverage';
import TechSlider from '@/components/landing/TechSlider';
import SocialResponsibility from '@/components/landing/SocialResponsibility';
import Footer from '@/components/landing/Footer';
import SolutionForm from '@/components/landing/SolutionForm';
import Chatbot from '@/components/landing/Chatbot';
import type { SolutionAssistantInput as SolutionAssistantInitialData } from '@/ai/flows/solution-assistant-flow';

// We create a more specific type for the form data
type FormSubmitData = {
  solutionType: string;
  entityType: string;
  situation: string;
};

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialData, setChatInitialData] = useState<FormSubmitData | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleFormSubmit = (data: FormSubmitData) => {
    setChatInitialData(data);
    setIsChatOpen(true);
  };
  
  const handleAssistantClick = () => {
    setChatInitialData(null);
    setIsChatOpen(true);
  };

  const handleServiceSelect = (serviceTitle: string) => {
    const service = services.find(s => s.title === serviceTitle);
    if (service) {
      setSelectedService(service);
    }
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header onAssistantClick={handleAssistantClick}/>
      <main className="flex-1">
        <div className='relative mb-[80px] h-[85vh]'>
          <Hero />
          <SolutionForm onSubmit={handleFormSubmit}/>
        </div>
        <ClientLogos />
        <AboutUs />
        <Certifications />
        <Portfolio 
          onServiceSelect={handleServiceSelect}
          selectedService={selectedService}
          onCloseModal={handleCloseModal}
        />
        <Coverage />
        <TechSlider />
        <SocialResponsibility />
      </main>
      <Footer />

      {isChatOpen && (
        <div className="fixed bottom-4 right-4 z-50">
           <Chatbot
            initialData={chatInitialData}
            onClose={() => setIsChatOpen(false)}
            onServiceClick={handleServiceSelect}
          />
        </div>
      )}
    </div>
  );
}
