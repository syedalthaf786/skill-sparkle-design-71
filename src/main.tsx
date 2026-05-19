import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, Outlet } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { RootComponent, NotFoundComponent } from './routes/__root'
import Index from './routes/index'
import About from './routes/about'
import Services from './routes/services'
import Industries from './routes/industries'
import Careers from './routes/careers'
import Contact from './routes/contact'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootComponent>
      <Outlet />
    </RootComponent>,
    children: [
      { index: true, element: <Index /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'industries', element: <Industries /> },
      { path: 'careers', element: <Careers /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFoundComponent /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)