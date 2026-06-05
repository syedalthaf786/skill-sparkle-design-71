import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Outlet, useLocation } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { RootComponent, NotFoundComponent } from "./routes/__root";
import Index from "./routes/index";
import About from "./routes/about";
import Services from "./routes/services";
import Industries from "./routes/industries";
import Careers from "./routes/careers";
import Contact from "./routes/contact";
import Admin from "./routes/admin";
import Blog from "./routes/blog";
import BlogDetails from "./routes/blog-details";
import "./styles.css";

// Global 3D mouse-tilt: writes --tx/--ty (-1..1) and --gx/--gy (% glare) on hovered cards.
if (typeof window !== "undefined") {
  const handler = (e: MouseEvent) => {
    const t = e.target as HTMLElement | null;
    const card = t?.closest?.(".card-surface") as HTMLElement | null;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--tx", String(x * 2 - 1));
    card.style.setProperty("--ty", String(y * 2 - 1));
    card.style.setProperty("--gx", String(x * 100));
    card.style.setProperty("--gy", String(y * 100));
  };
  const reset = (e: MouseEvent) => {
    const card = (e.target as HTMLElement)?.closest?.(".card-surface") as HTMLElement | null;
    if (!card) return;
    card.style.setProperty("--tx", "0");
    card.style.setProperty("--ty", "0");
  };
  window.addEventListener("mousemove", handler, { passive: true });
  window.addEventListener("mouseout", reset, { passive: true });
}


function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootComponent>
        <ScrollToTop />
        <Outlet />
      </RootComponent>
    ),
    children: [
      { index: true, element: <Index /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "industries", element: <Industries /> },
      { path: "careers", element: <Careers /> },
      { path: "contact", element: <Contact /> },
      { path: "admin", element: <Admin /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetails /> },
      { path: "*", element: <NotFoundComponent /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
