import React from 'react'
import { useTranslation } from 'react-i18next'
const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"

const PerPage = ({ perPage, setPerPage }) => {

     const { t } = useTranslation('common')
    return (
        <div className='flex items-center'>
            <p className='text-[#223354]/50 text-sm'>{t("row_per_page")}</p>
            <select
                className={`${selectClassName} outline-0 border-0`}

                name="perPage"
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
        </div>
    )
}

export default PerPage
