import React, { useEffect, useId } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobStore } from '../../../providers/zustand';

export default function Limit() {
    const limitID = useId();
    const { setFilters, filters } = useJobStore();
    const [searchParams, setSearchParams] = useSearchParams();

    // Valores permitidos para el límite
    const limits: number[] = [5, 10, 15, 20];

    useEffect(() => {
        let urlLimit = parseInt(searchParams.get('limit') || ''); // Convertir el valor de la URL a número

        // Validar si `urlLimit` no es válido o no está en los valores permitidos
        if (isNaN(urlLimit) || !limits.includes(urlLimit)) {
            urlLimit = limits[0]; // Valor predeterminado
            searchParams.set('limit', urlLimit.toString()); // Actualizar en la URL
            setSearchParams(searchParams);
        }

        // Sincronizar `filters.limit` con el valor válido de la URL
        if (filters.limit !== urlLimit) {
            setFilters({ ...filters, limit: urlLimit });
        }
    }, [filters.limit]);
    //}, [filters.limit, searchParams, setFilters, setSearchParams]);

    // Maneja el cambio del límite desde el dropdown
    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(event.target.value, 10); // Convertir a número

        // Actualizar en la URL y el store
        searchParams.set('limit', newLimit.toString());
        setSearchParams(searchParams);
        setFilters({ ...filters, limit: newLimit });
        //setJobs({ limit: newLimit });
    };

    return (
        <div>
            <label htmlFor={limitID}>Limit:</label>
            <select
                id={limitID}
                value={filters.limit}
                onChange={handleLimitChange}
                className="select-class"
            >
                {limits.map((value) => (
                    <option value={value} key={`limit-${value}`}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}
