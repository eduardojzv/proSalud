import React, {useId } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobStore } from '../../../providers/zustand';
import { limits } from '../../../helpers/jobList/limits';

export default function Limit() {
    const limitID = useId();
    const {filters } = useJobStore();
    const [searchParams, setSearchParams] = useSearchParams();
    // Maneja el cambio del límite desde el dropdown
    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(event.target.value, 10); // Convertir a número

        // Actualizar en la URL y el store
        searchParams.set('limit', newLimit.toString());
        setSearchParams(searchParams);
        //setFilters({ ...filters, limit: newLimit });
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
