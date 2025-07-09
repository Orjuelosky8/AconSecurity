import { AconShieldLogo } from '@/components/icons/logo';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <AconShieldLogo className="h-7 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Acon Security. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
