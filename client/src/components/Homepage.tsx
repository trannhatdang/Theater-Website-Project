import * as React from 'react'
import ImageCarousel from './ImageCarousel.tsx'
import type { FilmProps, FilmFilters } from './Film.tsx'
import type { ScreeningProps, ScreeningFilters } from './Screening.tsx'
import { getScreening, getFilmArr } from '../utils/Query.tsx'
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

export default function HomePage() {
  const [filmFiltersArr, _] = React.useState<FilmFilters[]>([])
  
  const filmQuery = useQuery({
    queryKey: [filmFiltersArr],
    queryFn: async (): Promise<FilmProps[]> => getFilmArr(filmFiltersArr),
  });

  const screeningQuery = useQuery({
    queryKey: [createNowShowingFilters()],
    queryFn: async (): Promise<ScreeningProps[]> => getScreening(createNowShowingFilters()),
  });

  if (filmQuery.isError || screeningQuery.isError) {
    return (
      <div className='bg-gray-900 text-white min-h-screen flex items-center justify-center'>
        <p className='text-red-500 text-xl'>Error loading data. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

		
	{/* Hero Section */}
	<section className="hero py-20 bg-gray-900 flex justify-center">
	<div className="max-w-4xl bg-red-600 p-10 rounded-md shadow-lg text-center">
		<h1 className="text-4xl font-bold text-yellow-100">Welcome to |Cinema|</h1>
		<p className="mt-4 text-lg text-yellow-200">Book your seats online — fast, simple and secure.</p>
		<a
		href="#now-showing"
		className="btn mt-6 inline-block px-6 py-2 bg-yellow-400 text-red-800 font-semibold rounded"
		>
		Book Now
		</a>
	</div>
	</section>

      {/* Now Showing Section */}
      <section id="now-showing" className="movies container mx-auto py-10 bg-gray-800 text-white rounded-md">
		<h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 to-red-500 text-transparent bg-clip-text tracking-wide">
  		NOW SHOWING
		</h2>
        <div className="slider-container relative">
          {filmQuery.isPending ? (
            <p>Loading films...</p>
          ) : (
            <ImageCarousel films={filmQuery.data} />
          )}
        </div>
      </section>

    </div>
  )
}
