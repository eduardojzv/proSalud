import { useSearchParams } from "react-router-dom";
import { useJobStore } from "../providers/zustand";
import { Filters } from "../helpers/interfaces/workWithUs";

export function useHandleParamChange() {
    const { filters, setJobs, setFilters } = useJobStore();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleParamChange = (key: string, value: any, options = { isMulti: false }) => {
        const { isMulti } = options;

        if (key.includes('.')) {
            // Manejo de claves anidadas (e.g., 'locations.country')
            const [parentKey, childKey] = key.split('.') as [keyof Filters, string];

            // Verificar si `filters[parentKey]` es un objeto
            const parentValue = filters[parentKey];
            if (typeof parentValue === 'object' && parentValue !== null) {
                const updatedNestedFilters = {
                    ...parentValue,
                    [childKey]: value,
                };

                const updatedFilters = {
                    ...filters,
                    [parentKey]: updatedNestedFilters,
                    offSet: 0, // Reiniciar el offset
                };

                setFilters(updatedFilters);
                setJobs(updatedFilters);

                // Actualizar la URL
                searchParams.set(childKey, value.toString());
                searchParams.set('page', '1');
                setSearchParams(searchParams);
            } else {
                console.error(`El valor de "${parentKey}" no es un objeto válido para una clave anidada.`);
            }
        } else if (Array.isArray(filters[key as keyof Filters]) || isMulti) {
            // Manejo de listas (e.g., 'categories')
            const existingValues = searchParams.get(key)?.split(',') || [];
            if (!existingValues.includes(value)) {
                existingValues.push(value);
            }

            const updatedFilters = {
                ...filters,
                [key]: existingValues,
                offSet: 0,
            };

            setFilters(updatedFilters);
            setJobs(updatedFilters);

            // Actualizar la URL
            searchParams.set(key, existingValues.join(','));
            searchParams.set('page', '1');
        } else {
            // Manejo de claves simples (e.g., 'limit')
            const updatedFilters = {
                ...filters,
                [key]: value,
                offSet: 0,
            };

            setFilters(updatedFilters);
            setJobs(updatedFilters);

            // Actualizar la URL
            searchParams.set(key, value.toString());
            searchParams.set('page', '1');
        }

        setSearchParams(searchParams);
    };

    const removeParamValue = (key: string, value: any) => {
        if (Array.isArray(filters[key as keyof Filters])) {
            // Remover un valor de una lista
            const existingValues = searchParams.get(key)?.split(',') || [];
            const updatedValues = existingValues.filter((v) => v !== value);

            const updatedFilters = {
                ...filters,
                [key]: updatedValues,
            };

            setFilters(updatedFilters);
            setJobs(updatedFilters);

            if (updatedValues.length > 0) {
                searchParams.set(key, updatedValues.join(','));
            } else {
                searchParams.delete(key);
            }
        } else if (key.includes('.')) {
            // Manejo de claves anidadas
            const [parentKey, childKey] = key.split('.') as [keyof Filters, string];
            const parentValue = filters[parentKey];

            if (typeof parentValue === 'object' && parentValue !== null) {
                const updatedNestedFilters = {
                    ...parentValue,
                    [childKey]: value,
                };

                setFilters({
                    ...filters,
                    [parentKey]: updatedNestedFilters,
                });
            } else {
                console.error(`El valor de ${parentKey} no es un objeto válido.`);
            }
        }

        setSearchParams(searchParams);
    };

    return { handleParamChange, removeParamValue };
}
