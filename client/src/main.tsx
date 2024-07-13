import React from 'react'
import ReactDOM from 'react-dom/client'

import { NextUIProvider } from '@nextui-org/react'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';

import './index.css';
import { TanStackProvider } from './plugins/TanStackProvider.tsx';
import { AuthProvider } from './auth/context/auth/AuthProvider.tsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TanStackProvider>
      <AuthProvider>
      <ToastContainer />
        <NextUIProvider>
          <main /* className="dark text-foreground bg-background" */>
            <RouterProvider router={ router } />
          </main>
        </NextUIProvider>
      </AuthProvider>
    </TanStackProvider>
  </React.StrictMode>,
)
