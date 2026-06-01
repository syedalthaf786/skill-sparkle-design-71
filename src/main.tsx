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
