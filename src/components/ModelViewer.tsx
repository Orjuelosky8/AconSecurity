
"use client";

import "@google/model-viewer";

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
  return (
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
  );
};

export default ModelViewer;

