import Logo from './Logo.tsx'
import Button from '@mui/material/Button'
export default function Navbar(){
	return (
		<div className='flex bg-slate-700 w-screen h-30 rounded-md mb-10 p-4'>
			<Logo />
			<div className='flex mx-200'>
				<Button href="./"> <p className='text-cyan-500'>home</p> </Button>
				<Button href="./film"> <p className='text-cyan-500'>film</p> </Button>
				<Button href="./promotion"> <p className='text-cyan-500'>promotion</p> </Button>
				<Button href="./event"> <p className='text-cyan-500'>event</p> </Button>
				<Button href="./login"> <p className='text-cyan-500'>login</p> </Button>
			</div>
		</div>



	)
}
