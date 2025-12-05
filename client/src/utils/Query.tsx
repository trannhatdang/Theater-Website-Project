import type { QueryFunctionContext } from "@tanstack/react-query";

const url = "http://localhost:3069";   // <-- keep this

export async function fetchEmployeeData(
    { queryKey }: QueryFunctionContext
) {
    // queryKey = ["employee", { Filters: {...} }]
    const [_key, params] = queryKey as [
        string,
        { Filters?: Record<string, string> }
    ];

    const queryParams = params?.Filters
        ? new URLSearchParams(params.Filters).toString()
        : "";

    const response = await fetch(`${url}/employee?${queryParams}`, {
        method: "GET"
    });

    if (!response.ok) {
        console.error(response);
        throw new Error("something went wrong...");
    }

    return response.json();
}
