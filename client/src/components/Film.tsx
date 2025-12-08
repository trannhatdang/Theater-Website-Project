import Button from '@mui/material/Button'

export type FilmProps = {
	name: string,
	descript: string,
	img: string,
	alt: string
}

export default function Film({film} : {film: FilmProps}){
	const {
		name,
		img,
		alt,
		descript
	} = film;

	return (
		<div className="bg-gray-800 w-60 h-80 rounded-3xl p-1 text-center mx-2">
			<img src={img} alt={alt} className="h-40 bg-black-800 object-contain"></img>
			<div className="p-4">
				<p className="mb-2 text-sm">{name}</p>
				<p className="mb-2 text-md text-white">{descript}</p>
				<Button>Book</Button>
			</div>
		</div>

	)
}
