import * as React from 'react'
import type { FilmProps } from './Film.tsx'
import Film from './Film.tsx'
//import modulo from '../utils/Modulo.tsx'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'motion/react'
import IconButton from '@mui/material/IconButton';

function CarouselItem({ film, pos, len } : { film : FilmProps, pos: number, len: number}){
	return (
		<motion.div className={'absolute' + ((pos === len || pos === len-1 || pos === len+1) ? '' : '')} animate={{x: (pos * 250)}}>
			<Film film={film}/>
		</motion.div>
	)
}

export default function ImageCarousel({films} : {films: FilmProps[]}){
	const [filmArr, _] = React.useState(films.concat(films))
	const [items, setItems] = React.useState(Array.from(filmArr.keys()))

	const slideRight = () => {
		const n = items.length;
		setItems((prev) => {
			return prev.map((_, idx) => prev[(idx - 1 + n) % n])
		})
	}

	const slideLeft = () => {
		const n = items.length;
		setItems((prev) => {
			return prev.map((_, idx) => prev[(idx + 1) % n])
		})
	}


	return (
		<div className='flex h-100 w-full overflow-hidden mx-auto'>
			<IconButton
				onClick={slideLeft}
				sx={{
					color: 'white',
					backgroundColor: 'rgba(255,255,255,0.25)',
					backdropFilter: 'blur(4px)',
					borderRadius: '9999px',
					width: 48,
					height: 48,
					'&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' }
				}}
			><ArrowBackIosIcon /></IconButton>

			<div className='overflow-hidden h-full w-full'>
				<div className='relative flex -translate-x-120'>
					{items.map((item, idx) =>{
						console.log(items)
						return <CarouselItem film={filmArr[idx]} key={idx} pos={item} len={films.length}/>
					})}
				</div>
			</div>

			<IconButton
				onClick={slideRight}
				sx={{
					color: 'white',
					backgroundColor: 'rgba(255,255,255,0.25)',
					backdropFilter: 'blur(4px)',
					borderRadius: '9999px',
					width: 48,
					height: 48,
					'&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' }
				}}
			><ArrowForwardIosIcon /></IconButton>
		</div>
	)
}
