import * as React from 'react'
import { useQuery } from "@tanstack/react-query"
import WorkShiftTable from './WorkShiftTable.tsx'
import { getWorkShift } from '../utils/Query.tsx'

export type WorkShiftFilters = {
	ma_nv?: string,
	ca_lam_viec?: string,
	min_ngay_lam?: Date,
	max_ngay_lam?: Date,
	min_thoi_gian_lam?: number,
	max_thoi_gian_lam?: number,
	isStrict?: boolean
}

export type WorkShiftProps = {
	ma_nv: string,
	ca_lam_viec: string,
	ngay_lam: Date,
	thoi_gian_lam: number,
}

export default function WorkShift(){
	const [filters, _] = React.useState<WorkShiftFilters>({})
	const { isPending, isError, data, error } = useQuery({
		queryKey: [filters], 
		queryFn: () : Promise<WorkShiftProps[]> => {
			return Promise.resolve(getWorkShift(filters));
		},
	});

	return (
		<div className='m-2 w-full h-full'>
			{(!isPending && !isError) ? <WorkShiftTable shifts={data}/> : <>{error?.message}</>}
		</div>
	)
	
}
