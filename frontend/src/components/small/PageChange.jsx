import React from 'react'
import { Badge } from "@/components/ui/badge"

const PageChange = ({ page, setPage, total_pages, loading }) => {
    return (
        <div className='flex gap-2'>
            <button disabled={page === 1 || loading} onClick={() => setPage(page - 1)}><Badge className={"text-[17px] py-[1px] font-semibold"}>{`${"<"}`}</Badge></button>
            <button disabled={page === total_pages || loading} onClick={() => setPage(page + 1)}><Badge className={"text-lg font-semibold text-[17px] py-[1px]"}>{`${">"}`}</Badge></button>
        </div>
    )
}

export default PageChange
