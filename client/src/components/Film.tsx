import Button from '@mui/material/Button'

export type FilmProps = {
	name: string,
	descript: string,
	img: string,
	alt: string
}

export default function Film({film}: {film: FilmProps}){
	const {
		name,
		img,
		alt,
		descript
	} = film;

	return (
		<div className="w-full bg-gray-800 rounded-3xl p-1 text-center">
			<img src={img} alt={alt} className="w-full h-50 block bg-black-800 object-contain"></img>
			<div className="p-4">
				<p className="mb-2 text-sm">{name}</p>
				<p className="mb-2 text-md text-white">{descript}</p>
				<Button>Book</Button>
			</div>
		</div>

	)
}
