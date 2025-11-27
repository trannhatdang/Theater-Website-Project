import Box from '@mui/material/Box'
export default function Header(){
	return (
		<header className = 'flex bg-slate-700'>
			<div className ='flex ml-2 mt-2'>
				<a href="./" className='text-5xl font-medium text-cyan-400'>BK_THEATER</a>
				<p className='text-s font-thin text-cyan-200'>Your location for the best films</p>
			</div>

			<nav className='flex ml-auto justify-end-safe text-xl font-xs'>
				<a href="./dashboard" className = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Dashboard</a>
				<a href="./employee" className = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Employees</a>
				<a href="./film" className = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Films</a>
				<a href="./event" className = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Events</a>
				<a href="./promotion" className = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Promotions</a>
			</nav>
		</header>
	)
}
