import * as React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import type { FilmProps } from './Film.tsx'
import Film from './Film.tsx'
import { motion } from 'motion/react'


export default function FilmImageCarousel({
	films,
}:{
	films: FilmProps[]
}){
	const [x, setX] = React.useState(0);
	const [left, setLeft] = React.useState(0)
	const [right, setRight] = React.useState(4)
	const [filmsShown, setFilmsShown] = React.useState<FilmProps[]>(films.slice(0,4))
	const slideLeft = () => {
		setX(x-200)
		const n: number = films.length
		const newLeft = left-1
		const newRight = right-1

		setLeft(newLeft - (newLeft * parseInt(n/newLeft)));
		setLeft(newRight - (newRight * parseInt(n/newRight)));

		if(left < right){
			setFilmsShown(films.slice(left, right))
		}
		else{
			setFilmsShown(films.slice(right, left))
		}
	}

	const slideRight = () => {
		setX(x+200)
		setRight((right + 1) % films.length)
		setLeft((left + 1) % films.length)
		if(left < right){
			setFilmsShown(films.slice(left, right))
		}
		else{
			setFilmsShown(films.slice(right, left))

		}
	}


	return (
		<div className='flex'>
			<IconButton aria-label="back" onClick={slideLeft}>
				<ArrowBackIosIcon />
			</IconButton>

			<div className='overflow-hidden'>
				<motion.div animate={{x}} className='flex w-full'>
					{filmsShown.map((film) => {return <Film film={film} key={film.name}/>})}
				</motion.div>
			</div>

			<IconButton aria-label="back" onClick={slideRight}>
				<ArrowForwardIosIcon />
			</IconButton>
		</div>
	)
}
