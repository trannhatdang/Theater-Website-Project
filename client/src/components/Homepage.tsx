import * as React from 'react'
import ImageCarousel from './ImageCarousel.tsx'
import type { FilmProps } from './Film.tsx'


export default function HomePage(){
	const [films, _] = React.useState<FilmProps[]>(
	[
		{
			name: "Tam Nhan Hanh",
			img: "./assets/images/tamnhanhhanh.jpg",
			descript: "Action • 120 min • 2D • Viet Sub",
			alt: "Tam Nhan Hanh Poster"
		},
		{
			name: "Am Anh",
			img: "./assets/images/poster2.jpg",
			descript: "Horror • 100 min • 2D • Viet Dub",
			alt: "Am Anh Poster",
		},
		{
			name: "Tomorrow With You",
			img: "./assets/images/poster4.jpg",
			descript: "Romance • 120 min • 2D • Viet Sub",
			alt: "Tomorrow With You  Poster",
		},
		{
			name: "Spy x Family",
			img: "./assets/images/poster5.jpg",
			descript: "• 90 min • 2D • Viet Sub",
			alt: "Spy x Family Poster",
		},
		{
			name: "Spy x Family",
			img: "./assets/images/poster5.jpg",
			descript: "• 90 min • 2D • Viet Sub",
			alt: "Spy x Family Poster",
		},
	])

	return (
		<div className='bg-slate-700 rounded-md py-1'>
			<p className='m-5 text-xl'>Now Showing:</p>
			<ImageCarousel films={films}/>
		</div>
	);
}
