import React from 'react';
import PerPage from '@/components/small/PerPage';
import PageChange from '@/components/small/PageChange';

const TableFooter = ({ perPage, setPerPage, page, setPage, pagination }) => {

    console.log(perPage)
    console.log(pagination)
    console.log(pagination?.items_per_page)
    console.log(page)

    return (
        <div className="flex justify-between items-center pb-3 px-4 mt-4">
            <PageChange page={pagination?.current_page} setPage={setPage} total_pages={pagination?.total_pages} />

            <p>Page {pagination?.current_page} of {pagination?.total_pages}</p>

            <PerPage perPage={pagination?.items_per_page} setPerPage={setPerPage} />
        </div>
    );
};

export default TableFooter;
