import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from "lucide-react";


const patientSearch = ({ search , setSearch}) => {
  return (
      <div className="relative w-full md:w-auto">
          <Label htmlFor="search"><Search className="  absolute left-2 top-1/2 transform -translate-y-1/2 text-primary" size={18} /></Label>
          <Input
              className=" pl-8 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients..."
          />
          
      </div>
  )
}

export default patientSearch
