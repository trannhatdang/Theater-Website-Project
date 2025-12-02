import Box from '@mui/material/Box'
export default function Header(){
	return (
		<header className = 'flex bg-slate-700 shadow-md'>
			<div className ='flex ml-2 mt-2'>
				<a href="./" className='font-medium text-5xl text-cyan-400 text-shadow-md '>BK_THEATER</a>
				<p className='font-thin text-s text-cyan-200 text-shadow-md'>Your location for the best films</p>
			</div>

			<nav className='flex ml-auto justify-end-safe text-xl font-xs'>
				<a href="./dashboard" className = 'p-1 m-4 hover:text-gray-600 border-violet-600'>Dashboard</a>
				<a href="./employee" className = 'p-1 m-4 hover:text-gray-600 border-violet-600'>Employees</a>
				<a href="./film" className = 'p-1 m-4 hover:text-gray-600 border-violet-600'>Films</a>
				<a href="./event" className = 'p-1 m-4 hover:text-gray-600 border-violet-600'>Events</a>
				<a href="./promotion" className = 'p-1 m-4 hover:text-gray-600 border-violet-600'>Promotions</a>
			</nav>
		</header>
	)
}
