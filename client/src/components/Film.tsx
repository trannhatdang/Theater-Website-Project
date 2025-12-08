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
		<div className="bg-gray-800 rounded-3xl p-1 text-center mx-1">
			<img src={img} alt={alt} className="w-50 h-50 block bg-black-800 object-contain"></img>
			<div className="p-4 w-50 h-50">
				<p className="mb-2 text-sm">{name}</p>
				<p className="mb-2 text-md text-white">{descript}</p>
				<Button>Book</Button>
			</div>
		</div>

	)
}
