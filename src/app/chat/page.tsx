
"use client";

import Chatbot from "@/components/landing/Chatbot";
import Header from "@/components/landing/Header";
import Content from "@/components/landing/Hero";
import Footer from "@/components/landing/Footer";
import { Suspense } from "react";

function ChatPageContent() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/20">
        <div className="w-full max-w-2xl h-[80dvh] min-h-[500px]">
          <Content />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ChatPageContent />
    </Suspense>
  )
}
