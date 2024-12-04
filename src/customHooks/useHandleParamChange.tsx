import { useSearchParams } from "react-router-dom";
import { useJobStore } from "../providers/zustand";
export function useHandleParamChange() {
    const { filters, setJobs, setFilters } = useJobStore();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleParamChange = (key: string, value: any) => {
        // Actualizar en la URL
        searchParams.set(key, value.toString());
        if (key !== 'page') {
            searchParams.set('page', "1"); // Siempre setea page a 0
        }
        setSearchParams(searchParams);

        // Actualizar filtros
        const updatedFilters = { ...filters, [key]: value, offSet: 0 }; // Siempre reinicia el offset
        setFilters(updatedFilters);

        // Fetch con los filtros actualizados
        setJobs(updatedFilters);
    };

    return { handleParamChange };
}
