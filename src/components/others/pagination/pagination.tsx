import { useSearchParams } from 'react-router-dom';
import styles from './pagination.module.css';
import { useJobStore } from '../../../providers/zustand';
import { IconLeftArrow } from '../../../icons/others/icons';
import { useEffect, useState } from 'react';

const { pagination, pagination__button, prev__button, pagination__active, pagination__next } = styles;

export function Pagination() {
    const { setFilters, setJobs, totalJobs, filters } = useJobStore();
    const [totalPages, setTotalPages] = useState<number>(5);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1') - 1;

    const handlePaginate = (pageNumber: number) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            console.log("pageNumber",pageNumber);
            
            const page = (pageNumber + 1).toString();
            searchParams.set('page', page);
            setSearchParams(searchParams);
            setFilters({ offSet: pageNumber.toString() });
            setJobs({ offSet: pageNumber.toString() });
        }
    };

    useEffect(() => {
        const total = Math.ceil(totalJobs / parseInt(filters.limit));
        setTotalPages(total);
        // if (currentPage > total) {
        //     console.log("shi");
            
        //     handlePaginate(total - 1); // Ajustar a la última página disponible
        // }
    }, [totalJobs, filters.limit]);

    return (
        <div className={pagination}>
            <button
                onClick={() => handlePaginate(currentPage - 1)}
                disabled={currentPage === 0}
                className={`${pagination__button} ${prev__button}`}
            >
                <IconLeftArrow />
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePaginate(index)}
                    className={`${pagination__button} ${currentPage === index ? pagination__active : ''}`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => handlePaginate(currentPage + 1)}
                disabled={currentPage + 1 === totalPages}
                className={`${pagination__button} ${pagination__next}`}
            >
                <IconLeftArrow />
            </button>
        </div>
    );
}
