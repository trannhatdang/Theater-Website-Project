import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import HomePage from './home/homepage.tsx'
import Employee from './employee/employee.tsx'
import Dashboard from './dashboard/dashboard.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />}
				<Route path='/employee' element={<HomePage />}
				<Route path='/dashboard' element={<HomePage />}
			</Routes>
		</BrowserRouter>
	</StrictMode>,
)
