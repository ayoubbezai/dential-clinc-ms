import React from 'react';
import PerPage from '@/components/small/PerPage';
import PageChange from '@/components/small/PageChange';

const FolderTableFooter = ({ perPage, setPerPage, page, setPage, pagination }) => {
    console.log(pagination)
    console.log(perPage)
    return (
        <div className="flex justify-between items-center pb-3 px-4 mt-4">
            <PageChange page={page} setPage={setPage} pagination={pagination} />

            <PerPage perPage={perPage} setPerPage={setPerPage} />
        </div>
    );
};

export default FolderTableFooter;
