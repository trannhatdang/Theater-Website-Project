import * as React from 'react'
import ImageCarousel from './ImageCarousel.tsx'
import type { FilmProps, FilmFilters } from './Film.tsx'
import type { ScreeningProps, ScreeningFilters } from './Screening.tsx'
import { fetchScreening, fetchFilm } from '../utils/Query.tsx'
import { useQuery } from "@tanstack/react-query";

function createNowShowingFilters() : ScreeningFilters {
	const currTime = new Date()
	let min_temp = currTime.toISOString().split('T')[0]
	let min_parts = min_temp.split('-')
	min_parts[2] = (parseInt(min_parts[2]) - 14).toString();

	const min = new Date(min_parts.join('-'))

	let max_temp = currTime.toISOString().split('T')[0]
	let max_parts = max_temp.split('-')
	max_parts[2] = (parseInt(max_parts[2]) + 14).toString();

	const max = new Date(max_parts.join('-'))

	return {
		min_thoi_gian_bat_dau: min,
		max_thoi_gian_ket_thuc: max,
	}
}

export default function HomePage(){
	const [filmFiltersArr, filmFiltersArr] = React.useState<FilmFilters[]>([])
	const filmQuery = useQuery({
		queryKey: [filmFiltersArr],
		queryFn: async () : Promise<FilmProps[]> => {
			return filmFiltersArr.map((filmFilters) => fetchFilm(filmFilters));
		}
	});

	const screeningQuery = useQuery({
		queryKey: [createNowShowingFilters()], 
		queryFn: async () : Promise<ScreeningProps[]> => {
			const screenings : ScreeningProps[] = await fetchScreening(createNowShowingFilters());

			let films : FilmFilters[] = [];
			screenings.forEach((screening) => {
				films.push({
					ma_phim: screening.ma_phim
				})
			})

			setFilmFiltersArr(films);

			return screenings;
		}
	});

	if(filmQuery.isError || screeningQuery.isError){
		return (
			<div className='bg-slate-700'>
				<p className='text-cyan-500'>Err, come back later</p>
			</div>
		)
	}


	return (
		<div className='bg-slate-700 rounded-md py-1 max-w-7xl mx-auto'>
			<p className='m-5 text-xl'>Now Showing:</p>
			<ImageCarousel films={filmQuery.data}/>
		</div>
	);
}
