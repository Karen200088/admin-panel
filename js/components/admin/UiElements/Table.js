import React from 'react';

const Table = ({className , children}) => {
    return (
        <>
            <table className={`table border border-secondary table-striped table-light ${className}`}>

                {children}

            </table>

        </>
    );
};

export default Table;
