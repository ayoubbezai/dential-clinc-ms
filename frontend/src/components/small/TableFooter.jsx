import React from 'react';
import PerPage from '@/components/small/PerPage';
import PageChange from '@/components/small/PageChange';

const TableFooter = ({ perPage, setPerPage, page, setPage, pagination }) => {

    return (
        <div className="flex justify-between items-center pb-3 px-4 mt-4">
            <PageChange page={page} setPage={setPage} pagination={pagination} />

            <p>Page {page} of {pagination?.total_pages}</p>

            <PerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
    );
};

export default TableFooter;
