import { Fragment} from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './pagination.module.css';
import { useJobStore } from '../../../providers/zustand';
import { IconLeftArrow } from '../../../icons/others/icons';

const {
    pagination,
    pagination__button,
    prev__button,
    pagination__active,
    pagination__next,
    pagination__ellipsis,
} = styles;

export function Pagination() {
    const {totalJobs, filters,setFilters } = useJobStore();
    const [searchParams, setSearchParams] = useSearchParams();

    const totalPages = Math.ceil(totalJobs / filters.limit); // Calcula el total de páginas
    const urlPage = parseInt(searchParams.get('page') || '1'); // Página actual en base-1 (por defecto 1)

    // Genera los números de página visibles
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 7;

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1); // Todas las páginas si son pocas
        }

        pageNumbers.push(1); // Primera página siempre visible

        if (urlPage > 3) {
            pageNumbers.push('...');
        }

        let start = Math.max(2, urlPage - 1);
        let end = Math.min(totalPages - 1, urlPage + 1);

        if (urlPage <= 3) {
            end = Math.min(totalPages - 1, maxVisiblePages - 2);
        }

        if (urlPage >= totalPages - 2) {
            start = Math.max(2, totalPages - maxVisiblePages + 3);
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        if (urlPage < totalPages - 2) {
            pageNumbers.push('...');
        }

        pageNumbers.push(totalPages); // Última página siempre visible

        return pageNumbers;
    };

    const visiblePages = getPageNumbers();

    // Maneja la navegación entre páginas
    const handlePaginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            searchParams.set('page', pageNumber.toString());
            setSearchParams(searchParams);
            setFilters({ ...filters, offSet: pageNumber - 1 });
            // Actualizar el estado con el nuevo `offset` (base-0)
            // if (filters.offSet !== urlPage - 1) {
            //     // Ajustar `offset` en base-0
            //     setFilters({ ...filters, offSet: pageNumber - 1 });
            // }
        }
    };

    return (
        <div className={pagination}>
            {/* Botón para la página anterior */}
            <button
                onClick={() => handlePaginate(urlPage - 1)}
                disabled={urlPage === 1}
                className={`${pagination__button} ${prev__button}`}
                aria-label="Previous page"
            >
                <IconLeftArrow />
            </button>

            {/* Botones de paginación */}
            {visiblePages.map((pageNumber, index) => (
                <Fragment key={index}>
                    {pageNumber === '...' ? (
                        <span className={pagination__ellipsis}>...</span>
                    ) : (
                        <button
                            onClick={() => handlePaginate(pageNumber as number)}
                            className={`${pagination__button} ${
                                urlPage === pageNumber ? pagination__active : ''
                            }`}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={urlPage === pageNumber ? 'page' : undefined}
                        >
                            {pageNumber}
                        </button>
                    )}
                </Fragment>
            ))}

            {/* Botón para la página siguiente */}
            <button
                onClick={() => handlePaginate(urlPage + 1)}
                disabled={urlPage === totalPages}
                className={`${pagination__button} ${pagination__next}`}
                aria-label="Next page"
            >
                <IconLeftArrow />
            </button>
        </div>
    );
}
