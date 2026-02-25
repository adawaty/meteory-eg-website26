import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-9xl font-heading font-bold text-muted-foreground/20">404</h1>
      <h2 className="text-3xl font-heading font-bold uppercase mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild size="lg" className="uppercase font-bold tracking-widest bg-primary hover:bg-primary/90 rounded-none">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
