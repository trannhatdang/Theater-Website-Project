import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' //added dom
import './index.css'
//import Sidebar from './components/Sidebar.tsx'
//import Homepage from './components/Homepage.tsx'
//import EmployeeView from './components/EmployeeView.tsx'
//import Dashboard from './components/Dashboard.tsx'
import Homepage from './components/Homepage.tsx'
import FilmList from './components/FilmList.tsx'
import Login from './components/Login.tsx'
import Register from './components/Register.tsx'
import Admin from './components/Admin.tsx'
import Dashboard from './components/Dashboard.tsx'
import EmployeeView from './components/EmployeeView.tsx'
import AdvancedSearch from './components/AdvancedSearch.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<StyledEngineProvider enableCssLayer>
				<GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
				<QueryClientProvider client={client}>
					<BrowserRouter>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/film' element={<FilmList />} />
							<Route path='/admin' element={<Admin />}>
								<Route path='employee' element={<EmployeeView />} />
								<Route path='advanced' element={<AdvancedSearch />} />
								<Route path='dashboard' element={<Dashboard />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</QueryClientProvider>
			</StyledEngineProvider>
		</LocalizationProvider>
	</StrictMode>
)
