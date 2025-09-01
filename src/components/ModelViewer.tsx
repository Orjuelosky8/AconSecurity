
"use client";

import { useEffect, useState } from "react";
import Script from 'next/script';

// This type definition needs to be at the top level
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<any, HTMLElement>;
    }
  }
}

interface ModelViewerProps {
  src: string;
  iosSrc?: string;
  alt: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ src, iosSrc, alt }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This hook ensures the component only renders on the client side
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or nothing on the server
    return <div style={{ width: "100%", height: "100%" }} />;
  }

  return (
    <>
      <Script 
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js" 
        type="module" 
        strategy="lazyOnload"
      />
      <model-viewer
        src={src}
        ios-src={iosSrc}
        alt={alt}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        environment-image="neutral"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      ></model-viewer>
    </>
  );
};

export default ModelViewer;
