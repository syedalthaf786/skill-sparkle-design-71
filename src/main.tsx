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
// Also writes a viewport-level --mx/--my (0..100) so a global spotlight can follow the cursor.
if (typeof window !== "undefined") {
  const root = document.documentElement;
  const handler = (e: MouseEvent) => {
    root.style.setProperty("--mx", String((e.clientX / window.innerWidth) * 100));
    root.style.setProperty("--my", String((e.clientY / window.innerHeight) * 100));
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

  // ===== Scroll-synced 3D parallax per section =====
  // Sets --sp (-1..1: -1 entering bottom, 0 centered, 1 leaving top) and --sp01 (0..1) on each <section>.
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight || 1;
    const sections = document.querySelectorAll<HTMLElement>("section");
    sections.forEach((s) => {
      const r = s.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const sp = Math.max(-1, Math.min(1, (vh / 2 - center) / (vh / 2 + r.height / 2)));
      s.style.setProperty("--sp", sp.toFixed(4));
      s.style.setProperty("--sp01", ((sp + 1) / 2).toFixed(4));
    });
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  setTimeout(update, 0);
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
