import React from 'react';
import PerPage from '@/components/TableComp/PerPage';
import PageChange from '@/components/TableComp/PageChange';
import { useTranslation } from "react-i18next";

const TableFooter = ({ setPerPage, setPage, pagination }) => {
    const { t: tCommon } = useTranslation("common")

    return (
        <div className="flex justify-between items-center pb-3 px-4 mt-4">
            <PageChange page={pagination?.current_page} setPage={setPage} total_pages={pagination?.total_pages} />

            <p>{tCommon("page")} {pagination?.current_page}{tCommon("of")} {pagination?.total_pages}</p>

            <PerPage perPage={pagination?.items_per_page} setPerPage={setPerPage} />
        </div>
    );
};

export default TableFooter;
