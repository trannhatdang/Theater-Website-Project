import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Sidebar from './components/Sidebar.tsx'
import HomePage from './components/Homepage.tsx'
import EmployeeView from './components/EmployeeView.tsx'
import Dashboard from './components/Dashboard.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client ={client}>
			<div className='flex'>
				<Sidebar/>
				<BrowserRouter>
					<Routes>
						<Route index element={<HomePage />}/>
						<Route path='/employee' element={<EmployeeView />}/>
						<Route path='/dashboard' element={<Dashboard />}/>
					</Routes>
				</BrowserRouter>
			</div>
		</QueryClientProvider>
	</StrictMode>,
)
