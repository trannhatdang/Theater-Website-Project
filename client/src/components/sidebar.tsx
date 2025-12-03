import * as React from 'react'
import { motion } from 'motion/react'
//import Container from '@mui/material/Container';
//import Box from '@mui/material/Box'
//import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CelebrationIcon from '@mui/icons-material/Celebration';
export default function Sidebar(){
	const [open, setOpen] = React.useState<Boolean>(false);

	function handleClickOpen(){
		setOpen(!open);
	}

	return (
		<motion.div className='bg-slate-700 h-screen' animate={{width: open ? 120 : 70}}>
			<Stack>
				<Button onClick={handleClickOpen}> <MenuIcon className='text-cyan-500'/> </Button>
				<Button href="./"> {open ? <p className='text-cyan-500'>home</p> : <HomeIcon className='text-cyan-500'/>} </Button>
				<Button href="./employee"> {open ? <p className='text-cyan-500'>employee</p> : <PeopleIcon className='text-cyan-500'/> } </Button>
				<Button href="./film"> {open ? <p className='text-cyan-500'>film</p>: <TheatersIcon className='text-cyan-500'/>} </Button>
				<Button href="./promotion"> {open ? <p className='text-cyan-500'>promotion</p> : <LoyaltyIcon className='text-cyan-500'/>} </Button>
				<Button href="./event"> {open ? <p className='text-cyan-500'>event</p> : <CelebrationIcon className='text-cyan-500'/>} </Button>
			</Stack>
		</motion.div>
	)
}
