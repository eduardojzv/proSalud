import './pagination.css'
import { useSearchParams } from 'react-router-dom';

interface Props {
    totalPages: number;
}

export function Pagination({ totalPages }: Props) {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10); // Por defecto, el limit es 5

    const handlePaginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setSearchParams({ page: pageNumber.toString(), limit: limit.toString() });
        }
    };

    return (
        <div className="pagination-container">
            <button
                onClick={() => handlePaginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button prev-button"
            >
                Anterior
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => handlePaginate(index + 1)}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => handlePaginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button next-button"
            >
                Siguiente
            </button>
        </div>
    );
}