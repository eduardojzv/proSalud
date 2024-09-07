import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Limit() {
    const [searchParams, setSearchParams] = useSearchParams();
    const limits:number[]=[
        5,10,15
    ]
    //valor predeterminado 
    useEffect(() => {
        const valueLimit=searchParams.get('limit')
        if (!valueLimit || !limits.includes(parseInt(valueLimit))) {
            searchParams.set('limit', '5');
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);

    // Maneja el cambio en el límite
    const handleJobsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = event.target.value;
        searchParams.set('limit', newLimit);
        setSearchParams(searchParams);
    };

    return (
        <>
            <label htmlFor="jobsPerPage">Limit:</label>
            <select
                id="jobsPerPage"
                value={searchParams.get('limit') || '5'}
                onChange={handleJobsPerPageChange}
                className=""
            >
                {limits.map((limit)=>(
                    <option value={limit} key={`limit-${limit}`}>{limit}</option>
                ))}
            </select>
        </>
    );
}
