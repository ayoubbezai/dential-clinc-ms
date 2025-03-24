import React from 'react'
import PerPage from '@/components/small/PerPage';
import PageChange from '@/components/small/PageChange';

const FolderTableFooter = () => {
  return (
      <div className='flex justify-between items-center pb-3 px-4 mt-4'>
          <PageChange />
          <PerPage />
      </div>
  )
}

export default FolderTableFooter
