import React, { useId } from 'react';
import { useJobStore } from '../../../providers/zustand';
import { limits } from '../../../helpers/jobList/limits';
import { useHandleParamChange } from '../../../customHooks/useHandleParamChange';

export default function Limit() {
    const limitID = useId();
    const { filters} = useJobStore();
    const { handleParamChange } = useHandleParamChange();
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
