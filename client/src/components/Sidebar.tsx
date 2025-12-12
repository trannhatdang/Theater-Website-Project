import * as React from 'react'
import { motion } from 'motion/react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
export default function Sidebar(){
	const [open, setOpen] = React.useState<Boolean>(false);

	function handleClickOpen(){
		setOpen(!open);
	}

	return (
		<motion.div className='bg-slate-700 h-screen' animate={{width: open ? 120 : 70}}>
			<Stack>
				<Button onClick={handleClickOpen}> <MenuIcon className='text-cyan-500'/> </Button>
				<Button href="/admin"> {open ? <p className='text-cyan-500'>home</p> : <HomeIcon className='text-cyan-500'/>} </Button>
				<Button href="/admin/dashboard"> {open ? <p className='text-cyan-500'>dashboard</p> : <DashboardIcon className='text-cyan-500'/>} </Button>
				<Button href="/admin/employee"> {open ? <p className='text-cyan-500'>employee</p> : <PeopleIcon className='text-cyan-500'/> } </Button>
				<Button href="/admin/film"> {open ? <p className='text-cyan-500'>film</p>: <TheatersIcon className='text-cyan-500'/>} </Button>
				<Button href="/admin/promotion"> {open ? <p className='text-cyan-500'>promotion</p> : <LoyaltyIcon className='text-cyan-500'/>} </Button>
				<Button href="/admin/event"> {open ? <p className='text-cyan-500'>event</p> : <CelebrationIcon className='text-cyan-500'/>} </Button>
				<Button href="/admin/advanced"> {open ? <p className='text-cyan-500'>advanced</p> : <ManageSearchIcon className='text-cyan-500'/>} </Button>
				<Button href="/admin/shifts"> {open ? <p className='text-cyan-500'>shifts</p> : <WorkIcon className='text-cyan-500'/>} </Button>
				<Button href="/"> {open ? <p className='text-cyan-500'>back</p> : <KeyboardReturnIcon className='text-cyan-500'/>} </Button>

			</Stack>
		</motion.div>
	)
}
