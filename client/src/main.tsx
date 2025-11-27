import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import HomePage from './home/homepage.tsx'
import Employee from './employee/employee.tsx'
import Dashboard from './dashboard/dashboard.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />}/>
				<Route path='/employee' element={<Employee />}/>
				<Route path='/dashboard' element={<Dashboard />}/>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
