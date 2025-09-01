"use client";

import { useState } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import ClientLogos from '@/components/landing/ClientLogos';
import AboutUs from '@/components/landing/AboutUs';
import Certifications from '@/components/landing/Certifications';
import Portfolio from '@/components/landing/Portfolio';
import Coverage from '@/components/landing/Coverage';
import TechSlider from '@/components/landing/TechSlider';
import SocialResponsibility from '@/components/landing/SocialResponsibility';
import Footer from '@/components/landing/Footer';
import SolutionForm from '@/components/landing/SolutionForm';
import Chatbot from '@/components/landing/Chatbot';
import type { SolutionAssistantInput } from '@/ai/flows/solution-assistant-flow';

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialData, setChatInitialData] = useState<SolutionAssistantInput | null>(null);

  const handleFormSubmit = (data: SolutionAssistantInput) => {
    setChatInitialData(data);
    setIsChatOpen(true);
  };
  
  const handleAssistantClick = () => {
    setChatInitialData(null);
    setIsChatOpen(true);
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
        <Portfolio />
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
          />
        </div>
      )}
    </div>
  );
}
