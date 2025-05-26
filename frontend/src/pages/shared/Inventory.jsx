import React, { Suspense, useState } from 'react';
import { useTranslation } from "react-i18next";


const MedicinesTable = React.lazy(() => import('@/components/stock/MedicinesTable'));
const StockTable = React.lazy(() => import('@/components/stock/StockTable'));
const SuppliersTable = React.lazy(() => import('@/components/stock/SuppliersTable'));
const UnitsTable = React.lazy(() => import('@/components/stock/UnitsTable'));


const Inventory = () => {
  const [loadState, setLoadState] = useState({
    stockLoaded: false,
    medicinesLoaded: false,
    suppliersLoaded: false,
    unitsLoaded: false
  });
  const { t } = useTranslation("stock")


  return (
    <div className="w-full px-8 mb-4">
      <Suspense fallback={<div>Loading Stock Table...</div>}>
        <StockTable onLoaded={() => setLoadState(prev => ({ ...prev, stockLoaded: true }))} t={t} />
      </Suspense>

      <div className="grid grid-cols-12 gap-4 mt-[30px]">
        {loadState.stockLoaded && (
          <Suspense fallback={<div>Loading Medicines Table...</div>}>
            <MedicinesTable onLoaded={() => setLoadState(prev => ({ ...prev, medicinesLoaded: true }))} t={t} />
          </Suspense>
        )}
      </div>

      <div className="grid grid-cols-12 gap-4 mt-[30px]">
        {loadState.medicinesLoaded && (
          <>
            <Suspense fallback={<div>Loading Suppliers Table...</div>}>
              <SuppliersTable onLoaded={() => setLoadState(prev => ({ ...prev, suppliersLoaded: true }))} t={t} />
            </Suspense>
            <Suspense fallback={<div>Loading Units Table...</div>}>
              <UnitsTable onLoaded={() => setLoadState(prev => ({ ...prev, unitsLoaded: true }))} t={t} />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}

export default Inventory;