import React, { useId } from 'react';
import { useJobStore } from '../../../providers/zustand';
import { limits } from '../../../helpers/jobList/limits';
import { useHandleParamChange } from '../../../customHooks/useHandleParamChange';

export default function Limit() {
    const limitID = useId();
    const { filters} = useJobStore();
    //const [searchParams, setSearchParams] = useSearchParams();
    const { handleParamChange } = useHandleParamChange();
    // Maneja el cambio del límite desde el dropdown
    // const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const newLimit = parseInt(event.target.value, 10); // Convertir a número
    //     // Actualizar en la URL
    //     searchParams.set('limit', newLimit.toString());
    //     searchParams.set('page', "1");
    //     setSearchParams(searchParams);
    //     //actualizar filtros
    //     setFilters({...filters,limit:newLimit,offSet: 0})
    //     //fetch con el nuevo limit
    //     setJobs({...filters,limit:newLimit,offSet: 0})
    // };
    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(event.target.value, 10); // Convertir a número
        handleParamChange("limit", newLimit);
    };


    return (
        <div>
            <label htmlFor={limitID}>Limite de empleos:</label>
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
