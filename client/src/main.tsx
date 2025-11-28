import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.tsx'
import Header from './components/Header.tsx'
import Sidebar from './components/Sidebar.tsx'
import HomePage from './components/Homepage.tsx'
import Employee from './components/Employee.tsx'
import Dashboard from './components/Dashboard.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Header />
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />}/>
				<Route path='/employee' element={<Employee />}/>
				<Route path='/dashboard' element={<Dashboard />}/>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
