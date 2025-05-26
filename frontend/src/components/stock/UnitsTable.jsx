import React, { useState, Suspense, lazy } from 'react';
import AddButton from '../small/AddButton';
import PageChange from '../TableComp/PageChange';
import useUnits from '@/hooks/other/useUnits';
import UnitTableComp from './UnitTableComp';
import { useTranslation } from "react-i18next";

const AddUnitModel = lazy(() => import('@/models/AddModels/AddUnitModel'));


const UnitsTable = ({ t }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const { t: tCommon } = useTranslation("common")
    const {
        units,
        pagination,
        page,
        setPage,
        loading,
        error,
        fetchUnits
    } = useUnits();

    return (
        <>
            <div className="col-span-4 bg-white rounded-md shadow-sm py-4 px-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{t("units.units")}</h2>
                    <AddButton onClick={() => setIsAddModalOpen(true)} />
                </div>
                <UnitTableComp loading={loading} error={error} units={units} fetchUnits={fetchUnits} t={t} />

                <div className="flex justify-between items-center pb-2 px-4 mt-4">
                    <PageChange page={page} setPage={setPage} total_pages={pagination?.total_pages} loading={loading} />
                    <p className="text-[13px]">
                        {tCommon("page")} {pagination?.current_page} {tCommon("of")} {pagination?.total_pages}
                    </p>
                </div>
            </div>
            {isAddModalOpen && (
                <Suspense fallback={<div>Loading add Modal...</div>}>
                    <AddUnitModel
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        fetchUnits={fetchUnits}
                        t={t}
                    />
                </Suspense>
            )}
        </>
    );
};

export default UnitsTable;
