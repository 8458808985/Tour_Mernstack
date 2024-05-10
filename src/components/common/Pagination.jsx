import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const value = showPerPage * counter;
        onPaginationChange(value - showPerPage, value);
    }, [counter, onPaginationChange, showPerPage]);

    const onButtonClick = (type) => {
        if (type === 'prev') {
            if (counter > 1) {
                setCounter(counter - 1);
            }
        } else if (type === 'next') {
            const totalPages = Math.ceil(total / showPerPage);
            if (counter < totalPages) {
                setCounter(counter + 1);
            }
        }
    };

    return (
        <div className='d-flex justify-content-center'>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" onClick={() => onButtonClick('prev')}>Previous</a>
                    </li>
                    {Array.from({ length: Math.ceil(total / showPerPage) }, (_, index) => (
                        <li key={index} className={`page-item ${index + 1 === counter ? "active" : ""}`}>
                            <Link to="#" className="page-link" onClick={() => setCounter(index + 1)}>{index + 1}</Link>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" onClick={() => onButtonClick('next')}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
