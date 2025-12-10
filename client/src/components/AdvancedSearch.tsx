import * as React from 'react'
import type { EmployeeProps, EmployeeFilters } from './EmployeeView.tsx'
import EmployeeTable from './EmployeeTable.tsx'

export type AdvancedSearchFilters = {
	p_tu_khoa: string,
	p_gioi_tinh: string,
	p_luong_min: number,
	p_luong_max: number,
	p_chuc_vu: string,
	p_ten_rap: string,
	p_cot_sap_xep: string,
	p_kieu_sap_xep: string,
}

function AdvancedSearchInput(){

}

export default function AdvancedSearch(){
	const [isSearching, setIsSearching] = React.useState<boolean>(true)
	const [advancedFilters, setAdvancedFilters] = React.useState<AdvancedFilters>({})
	const { isPending, isError, data, error, refetch } = useQuery({
		queryKey: [filters], 
		queryFn: () : Promise<EmployeeProps[]> => {
			return Promise.resolve(fetchEmployee(filters));
		},
	});

	const handleApply = () => {
		setAdvancedFilters()
	}

	const employees = data;
	return (
		<>
			<AdvancedSearchInput onApply={handleApply}/>
			{(!isPending && !isError && !isSearching) ? <EmployeeTable employees={employees} refetch={refetch}/> : <>{error?.message}</>}
		</>
	)
}
