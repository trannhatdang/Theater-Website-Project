import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import RangeSlider from './RangeSlider.tsx'
export default function Sidebar(){
	return (
		<Box className='bg-slate-700'>
			<RangeSlider />
		</Box>
	)
}
