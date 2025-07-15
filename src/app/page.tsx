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
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [initialChatData, setInitialChatData] = useState<SolutionAssistantInput | null>(null);

  const handleFormSubmit = (data: SolutionAssistantInput) => {
    setInitialChatData(data);
    setIsChatbotOpen(true);
  };

  const handleOpenChatbot = () => {
    setInitialChatData(null); // Open without initial data
    setIsChatbotOpen(true);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header onOpenChatbot={handleOpenChatbot} />
      <main className="flex-1">
        <Hero />
        <SolutionForm onFormSubmit={handleFormSubmit} />
        <ClientLogos />
        <AboutUs />
        <Certifications />
        <Portfolio />
        <Coverage />
        <TechSlider />
        <SocialResponsibility />
      </main>
      <Chatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        initialData={initialChatData}
      />
      <Footer />
    </div>
  );
}
