import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
export default function Header(){
	return (
	<header class = 'flex bg-slate-700 sticky'>
		<div class='flex ml-2 mt-2'>
			<a href="./" class='text-5xl font-medium text-cyan-400'>BK_THEATER</a>
			<p class='text-s font-thin text-cyan-200'>Your location for the best films</p>
		</div>

		<nav class='flex ml-auto justify-end-safe text-xl font-xs'>
			<a href="./dashboard" class = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Dashboard</a>
			<a href="./employee" class = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Employees</a>
			<a href="#" class = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Films</a>
			<a href="#" class = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Events</a>
			<a href="#" class = 'p-1 m-4 hover:text-gray-600 border-violet-600 rounded-md'>Promotions</a>
		</nav>
	</header>
	)
}
