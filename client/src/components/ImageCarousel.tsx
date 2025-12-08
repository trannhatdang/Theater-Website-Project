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
		<motion.div className={'absolute' + ((pos === 0 || pos === 1 || pos === 2) ? '' : ' opacity-0')} animate={{x: (pos * 250)}}>
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
			return prev.map((_, idx) => prev[(idx + 1) % n])
		})
	}

	const slideLeft = () => {
		const n = items.length;
		setItems((prev) => {
			return prev.map((_, idx) => prev[(idx - 1 + n) % n])
		})
	}

	return (
		<div className='flex h-100 w-200'>
			<IconButton onClick={slideLeft}>
				<ArrowBackIosIcon />
			</IconButton>

			<div className='overflow-hidden relative h-full w-full'>
				{items.map((item, idx) =>{
					console.log(items)
					return <CarouselItem film={filmArr[idx]} key={idx} pos={item} len={films.length}/>
				})}
			</div>

			<IconButton onClick={slideRight}>
				<ArrowForwardIosIcon />
			</IconButton>
		</div>
	)
}
