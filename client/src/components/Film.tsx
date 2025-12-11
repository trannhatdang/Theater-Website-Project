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
	isStrict?: Boolean
}


export default function Film({ film }: { film: FilmProps }) {
  const { ma_phim, ten_phim, tom_tat_noi_dung } = film;

  return (
    <div className="bg-gray-800 w-60 h-96 rounded-3xl p-1 text-center mx-2 flex flex-col shadow-lg overflow-hidden">
      
      {/* Poster container */}
      <div className="h-72 flex justify-center items-center bg-black">
        <picture>
          <source 
            srcSet={`http://localhost:3069/assets/${ma_phim}.webp`} 
            type="image/webp" 
          />
          <img
            src={`http://localhost:3069/assets/${ma_phim}.jpg`}
            alt={ten_phim}
            className="max-h-full max-w-full object-contain"
          />
        </picture>
      </div>

      {/* Info and button */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <p className="text-sm font-semibold text-white">{ten_phim}</p>
        <p className="text-xs text-gray-300 flex-1">{tom_tat_noi_dung}</p>
        <Button variant="contained" size="small">Book</Button>
      </div>

    </div>
  )
}
