// components/AconShieldLogo.tsx
import ModelViewer from '@/components/ModelViewer';

export function AconShieldLogo(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
       <ModelViewer src="/models/logo.glb" alt="Acon Shield 3D Logo" />
    </div>
  );
}
