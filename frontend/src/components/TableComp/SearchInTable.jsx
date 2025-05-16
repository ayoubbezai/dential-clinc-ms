import React, { useCallback } from 'react';
import { Input } from '@/components/designSystem/input';
import { Label } from '@/components/designSystem/label';
import { Search } from "lucide-react";
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';

const SearchInTable = ({ search, setSearch }) => {
    const {t} = useTranslation('common');

    const handleSearchChange = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 500),
        []
    );

    const onChange = (e) => {
        handleSearchChange(e.target.value);
    };

    return (
        <div className="relative w-full md:w-auto">
            <Label htmlFor="search" className="mb-0">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
            </Label>
            <Input
                className="pl-8 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                id="search"
                defaultValue={search}
                onChange={onChange}
                placeholder={t("search_placeholder")}
            />
        </div>
    );
};

export default SearchInTable;
