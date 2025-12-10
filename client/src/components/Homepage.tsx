import * as React from 'react'
import ImageCarousel from './ImageCarousel.tsx'
import type { FilmProps, FilmFilters } from './Film.tsx'
import type { ScreeningProps, ScreeningFilters } from './Screening.tsx'
import { fetchScreening, fetchFilmArr } from '../utils/Query.tsx'
import { useQuery } from "@tanstack/react-query";
import Navbar from './Navbar.tsx'

function createNowShowingFilters() : ScreeningFilters {
	const currTime = new Date()
	const min = new Date();
	const max = new Date();
	min.setDate(currTime.getDate() - 3)
	max.setDate(currTime.getDate() + 4)

	return {
		min_thoi_gian_bat_dau: min,
		max_thoi_gian_ket_thuc: max,
	}
}

export default function HomePage(){
	const [filmFiltersArr, _] = React.useState<FilmFilters[]>([])
	const filmQuery = useQuery({
		queryKey: [filmFiltersArr],
		queryFn: async () : Promise<FilmProps[]> => {
			return fetchFilmArr(filmFiltersArr);
		},
	});

	const screeningQuery = useQuery({
		queryKey: [createNowShowingFilters()], 
		queryFn: async () : Promise<ScreeningProps[]> => {
			const screenings : ScreeningProps[] = await fetchScreening(createNowShowingFilters());

			let queried_films : FilmFilters[] = [];
			screenings.forEach((screening) => {
				queried_films.push({
					ma_phim: screening.ma_phim
				})
			})

			return screenings;
		},
	});

	if(filmQuery.isError || screeningQuery.isError){
		return (
			<div className='bg-slate-700'>
				<p className='text-cyan-500'>Err, come back later</p>
			</div>
		)
	}

	return (
		<>
			<Navbar />
			<div className='bg-slate-700 rounded-md py-1 max-w-7xl mx-auto'>
				<p className='m-5 text-xl'>Now Showing:</p>
				{filmQuery.isPending ? <p> wait </p> : <ImageCarousel films={filmQuery.data}/>}
			</div>
		</>
	);
}
