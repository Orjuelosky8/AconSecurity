
"use client";

import { useEffect, useState, useRef } from "react";
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
  rotationPerSecond?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ src, iosSrc, alt, rotationPerSecond = "10deg" }) => {
  const [isClient, setIsClient] = useState(false);
  const modelViewerRef = useRef(null);

  useEffect(() => {
    // This hook ensures the component only renders on the client side
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or nothing on the server to prevent hydration mismatch
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
        ref={modelViewerRef}
        src={src}
        ios-src={iosSrc}
        alt={alt}
        camera-controls
        auto-rotate
        rotation-per-second={rotationPerSecond}
        shadow-intensity="1"
        environment-image="neutral"
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
      ></model-viewer>
    </>
  );
};

export default ModelViewer;
