import * as React from 'react';
import EmployeeTopBar from './EmployeeTopBar';
import EmployeeTable from './EmployeeTable';
import { useQuery } from "@tanstack/react-query";
import { fetchEmployeeData } from '../utils/Query';
import type { EmployeeProps, EmployeeFilters } from '../types/employee';
import type { SearchBarKey } from './EmployeeTopBar';

interface FilterAction {
  type: string;
  filters?: EmployeeFilters;
  search?: SearchBarKey;
}

function filterReducer(filter: EmployeeFilters, action: FilterAction): EmployeeFilters {
  const { type, filters, search } = action;

  switch (type) {
    case 'FILTER':
      return filters ? { ...filter, ...filters } : filter;
    case 'SEARCH':
      return search ? { ...filter, [search.key]: search.val } : filter;
    default:
      return filter;
  }
}

export default function EmployeeView() {
  const [Filters, dispatch] = React.useReducer(filterReducer, {} as EmployeeFilters);

  const { isLoading, isError, data, error } = useQuery<EmployeeProps[], Error>({
    queryKey: ['employee', Filters],
    queryFn: ({ signal }) => fetchEmployeeData(Filters, signal),
  });

  const employees: EmployeeProps[] = data ?? [];

  return (
    <div className='flex flex-col m-10 gap-2'>
      <EmployeeTopBar dispatch={dispatch} />
      {!isLoading && !isError ? (
        <EmployeeTable employees={employees} />
      ) : (
        <>{error instanceof Error ? error.message : 'Loading...'}</>
      )}
    </div>
  );
}
