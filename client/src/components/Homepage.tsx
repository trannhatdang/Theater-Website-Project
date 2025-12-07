import * as React from 'react'
import Logo from './Logo.tsx'
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
			name: "Spy x Familysgdg",
			img: "./assets/images/poster5.jpg",
			descript: "• 90 min • 2D • Viet Sub",
			alt: "Spy x Family Poster",
		},
		{
			name: "Spy x Familfify",
			img: "./assets/images/poster5.jpg",
			descript: "• 90 min • 2D • Viet Sub",
			alt: "Spy x Family Poster",
		},
		{
			name: "Spy x Familfy",
			img: "./assets/images/poster5.jpg",
			descript: "• 90 min • 2D • Viet Sub",
			alt: "Spy x Family Poster",
		},
	])

	return (
		<div className="homepage-container">
			<Logo />
			<ImageCarousel films={films}/>
		</div>
	);
}
