import type { EmployeeProps, EmployeeFilters } from '../types/employee';

const url = "http://localhost:3069";

export async function fetchEmployeeData(
  filters: EmployeeFilters,
  signal?: AbortSignal
): Promise<EmployeeProps[]> {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) queryParams.append(key, String(value));
  });

  const response = await fetch(`${url}/employee?${queryParams.toString()}`, { signal });

  if (!response.ok) throw new Error("Failed to fetch employees");

  return response.json();
}