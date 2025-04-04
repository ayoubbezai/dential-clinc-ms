import MedicinesTable from '@/components/stock/MedicinesTable'
import SuppliersTable from '@/components/stock/SuppliersTable'
import UnitsTable from '@/components/stock/UnitsTable'
import React from 'react'

const Inventory = () => {
  return (
    <div className="w-full px-8 mb-4">
      <div className="grid grid-cols-12 gap-4 mt-[500px]">

      <MedicinesTable/>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-[50px]">
      <SuppliersTable/>
        <UnitsTable/>
      </div>
      
    </div>
  )
}

export default Inventory
