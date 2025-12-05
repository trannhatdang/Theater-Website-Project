import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' //added dom
import './index.css'
import Sidebar from './components/sidebar.tsx'
import HomePage from './components/Homepage.tsx'
import EmployeeView from './components/EmployeeView.tsx'
import Dashboard from './components/dashboard.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <div className='flex'>
          <Sidebar />
          <div className='flex-1 p-4'>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='/employee' element={<EmployeeView />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
