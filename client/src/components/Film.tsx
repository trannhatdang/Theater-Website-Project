import Button from '@mui/material/Button'

export type FilmProps = {
	ma_phim: string,
	ten_phim: string,
	thoi_luong: Date,
	do_tuoi_yeu_cau: number,
	thoi_gian_cong_chieu: number,
	tom_tat_noi_dung: string,
	dao_dien: string,
}

export type FilmFilters = {
	ma_phim?: string,
	ten_phim?: string,
	min_thoi_luong?: Date,
	max_thoi_luong?: Date,
	min_do_tuoi_yeu_cau?: number,
	max_do_tuoi_yeu_cau?: number,
	min_thoi_gian_cong_chieu?: number,
	max_thoi_gian_cong_chieu?: number,
	tom_tat_noi_dung?: string,
	dao_dien?: string,
}

export default function Film({film} : {film: FilmProps}){
	const {
		ma_phim,
		ten_phim,
		tom_tat_noi_dung,
	} = film;

	return (
		<div className="bg-gray-800 w-60 h-80 rounded-3xl p-1 text-center mx-2">
			<img src={'https://localhost:3000/assets/images/' + ma_phim + '.jpg'} alt={ten_phim} className="h-40 bg-black-800 object-contain"></img>
			<div className="p-4 h-25 flex-col">
				<p className="mb-2 flex-1 text-sm">{ten_phim}</p>
				<p className="mb-2 h-full text-md text-white">{tom_tat_noi_dung}</p>
				<Button>Book</Button>
			</div>
		</div>

	)
}
