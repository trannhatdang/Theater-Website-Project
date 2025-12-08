import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' //added dom
import './index.css'
//import Sidebar from './components/Sidebar.tsx'
//import Homepage from './components/Homepage.tsx'
//import EmployeeView from './components/EmployeeView.tsx'
//import Dashboard from './components/Dashboard.tsx'
import Homepage from './components/Homepage.tsx'
import Navbar from './components/Navbar.tsx'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StyledEngineProvider enableCssLayer>
			<GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
			<QueryClientProvider client={client}>
				<BrowserRouter>
					<Navbar />
					<div className='flex-1 p-4'>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
						</Routes>
					</div>
				</BrowserRouter>
			</QueryClientProvider>
		</StyledEngineProvider>
	</StrictMode>
)
