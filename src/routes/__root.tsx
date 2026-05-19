import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOffline } from "@/hooks/use-offline";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LoaderPage } from "@/components/site/LoaderPage";
import { OfflinePage } from "@/components/site/OfflinePage";

function NotFoundComponent() {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold brand-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <button 
          onClick={() => navigate("/")} 
          className="btn-primary mt-6"
        >
          Go home
        </button>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            navigate(-1); // Go back
          }}
          className="btn-primary mt-6"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Head content will be handled by individual routes */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

function RootComponent({ children }: { children: React.ReactNode }) {
  const isOffline = useOffline();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <LoaderPage />;
  }

  if (isOffline) {
    return <OfflinePage />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export { NotFoundComponent, ErrorComponent, RootShell, RootComponent };