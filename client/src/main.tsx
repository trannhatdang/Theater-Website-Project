import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' //added dom
import './index.css'
//import Sidebar from './components/Sidebar.tsx'
//import Homepage from './components/Homepage.tsx'
//import EmployeeView from './components/EmployeeView.tsx'
//import Dashboard from './components/Dashboard.tsx'
import Homepage from './components/Homepage.tsx'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import Admin from './components/Admin.tsx'
import EmployeeView from './components/EmployeeView.tsx'
import Advanced from './components/Advanced.tsx'
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
					<Routes>
						<Route index element={<Homepage />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />

						<Route path='/admin' element={<Admin />}>
							<Route path='employee' element={<EmployeeView />} />
							<Route path='advanced' element={<Advanced />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</StyledEngineProvider>
	</StrictMode>
)
