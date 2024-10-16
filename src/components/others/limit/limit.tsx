import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobStore } from '../../../providers/zustand';

export default function Limit() {
    const {setFilters,setJobs} = useJobStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const limits:number[]=[5,10,15]
    useEffect(() => {
        const valueLimit=searchParams.get('limit')
        console.log("value limit",valueLimit);
        
        if (!valueLimit || !limits.includes(parseInt(valueLimit))) {
            
            searchParams.set('limit', '5');
            setSearchParams(searchParams);
        }
        if (valueLimit) {
            setFilters({limit:valueLimit})
        }
    }, [searchParams]);

    // Maneja el cambio en el límite
    const handleLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLimit = event.target.value;
        searchParams.set('limit', newLimit);
        setSearchParams(searchParams);
        setJobs({limit:newLimit});
        //
        const page=searchParams.get('page')

        console.log("page",page);
    };

    return (
        <>
            <label htmlFor="jobsPerPage">Limit:</label>
            <select
                id="jobsPerPage"
                value={searchParams.get('limit') || '5'}
                onChange={handleLimit}
                className=""
            >
                {limits.map((limit)=>(
                    <option value={limit} key={`limit-${limit}`}>{limit}</option>
                ))}
            </select>
        </>
    );
}
