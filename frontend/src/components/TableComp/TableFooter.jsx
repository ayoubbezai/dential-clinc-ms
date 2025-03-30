import React from 'react';
import PerPage from '@/components/TableComp/PerPage';
import PageChange from '@/components/TableComp/PageChange';

const TableFooter = ({ setPerPage, setPage, pagination }) => {


    return (
        <div className="flex justify-between items-center pb-3 px-4 mt-4">
            <PageChange page={pagination?.current_page} setPage={setPage} total_pages={pagination?.total_pages} />

            <p>Page {pagination?.current_page} of {pagination?.total_pages}</p>

            <PerPage perPage={pagination?.items_per_page} setPerPage={setPerPage} />
        </div>
    );
};

export default TableFooter;
