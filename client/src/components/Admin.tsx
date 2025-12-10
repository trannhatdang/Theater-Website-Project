import Sidebar from './Sidebar.tsx'
import { Outlet } from 'react-router'
export default function Admin(){
	return (
		<div className = 'flex'>
			<Sidebar />
			<Outlet />
		</div>
	)
}
