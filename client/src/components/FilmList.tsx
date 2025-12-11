// FilmList.tsx (wrapper for multiple films)
import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFilmArr } from '../utils/Query.tsx';
import type { FilmProps, FilmFilters } from './Film.tsx';
import Film from './Film.tsx';

export default function FilmList() {
  const [filters] = React.useState<FilmFilters[]>([]);

 
  const { data: films, isLoading, isError } = useQuery({
  queryKey: [filters],
  queryFn: async (): Promise<FilmProps[]> => getFilmArr(filters),
  });

  if (isLoading) return <p>Loading films...</p>;
  if (isError) return <p>Error loading films</p>;
  console.log('Fetched films:', films);

  return (
    <div className="flex flex-wrap bg-gray-900 p-6 min-h-screen">
      {films?.map(film => (
        <Film key={film.ma_phim} film={film} />
      ))}
    </div>
  );
}