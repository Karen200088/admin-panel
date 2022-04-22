import React from 'react';
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({paginationParameters, activeTab , setActiveTab}) => {

    const pageNumbers = [];

    const MathPagination = (all, inPage) => {
        const factor = Math.ceil(all / inPage);
        return factor || 1
    }

    const tabsLength = MathPagination(paginationParameters?.all, paginationParameters?.inPage);

    for (let i = 1; i <= tabsLength; i++) {
        pageNumbers.push(i);
    }

    return (

        <Pagination>
            <Pagination.Prev onClick={() => setActiveTab(prevState => prevState - 1)} />

            {
                pageNumbers.map(number => {
                    return (
                        <Pagination.Item className={activeTab === number && "active"} key={number} onClick={() => setActiveTab(number)}>
                            {number}
                        </Pagination.Item>
                    )
                })
            }

            <Pagination.Next onClick={() => setActiveTab(prevState => prevState + 1)} />

        </Pagination>
    );
};

export default CustomPagination;
