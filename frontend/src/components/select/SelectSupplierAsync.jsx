import React, { useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { suppliersService } from '@/services/shared/supplierService';
import debounce from 'lodash/debounce';

const SelectSupplierAsync = ({ onChange, value }) => {
    const pageRef = useRef(1);
    const loadedOptions = useRef([]);
    const currentSearch = useRef('');
    const [isLoading, setIsLoading] = useState(false);

    const loadOptions = async (searchValue, page, append = false) => {
        setIsLoading(true);
        try {
            const { data } = await suppliersService.getAllSuppliers(1, searchValue, "", "", page);
            const newOptions = data?.data.map(supplier => ({
                label: supplier.name,
                value: supplier.id,
            })) || [];

            if (append) {
                loadedOptions.current = [...loadedOptions.current, ...newOptions];
            } else {
                loadedOptions.current = newOptions;
                pageRef.current = 1;
            }

            return loadedOptions.current;
        } catch (error) {
            console.error('Error loading options:', error);
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const loadMoreOptions = debounce(async (inputValue, callback) => {
        if (inputValue !== currentSearch.current) {
            currentSearch.current = inputValue;
            pageRef.current = 1;
        }
        const options = await loadOptions(inputValue, pageRef.current);
        callback(options);
    }, 500);

    const handleScrollToBottom = async () => {
        if (isLoading) return;
        const options = await loadOptions(currentSearch.current, pageRef.current + 1, true);
        if (options.length) pageRef.current += 1;
    };

    return (
        <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadMoreOptions}
            onMenuScrollToBottom={handleScrollToBottom}
            onChange={onChange}
            value={value}
            placeholder="Select Supplier"
            isClearable
            isLoading={isLoading}
            styles={{ menu: { zIndex: 9999 } }}
            filterOption={() => true}
        />
    );
};

export default SelectSupplierAsync;