import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { suppliersService } from '@/services/shared/supplierService';
import debounce from 'lodash/debounce';

const SelectSupplierAsync = ({ onChange, value }) => {
    const pageRef = useRef(1);
    const currentSearch = useRef('');
    const hasMoreRef = useRef(true);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        loadOptions('', 1, false);
    }, []);

    const loadOptions = async (search, page = 1, append = false) => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const { data } = await suppliersService.getAllSuppliers(1, search, '', '', page);
            const fetched = data?.data.map(supplier => ({
                label: supplier.name,
                value: supplier.id,
            })) || [];

            hasMoreRef.current = fetched.length > 0;

            setOptions(prev =>
                append ? [...prev, ...fetched] : fetched
            );
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = debounce((inputValue) => {
        currentSearch.current = inputValue;
        pageRef.current = 1;
        hasMoreRef.current = true;
        loadOptions(inputValue, 1, false);
    }, 300);

    const handleMenuScrollToBottom = () => {
        if (!isLoading && hasMoreRef.current) {
            pageRef.current += 1;
            loadOptions(currentSearch.current, pageRef.current, true);
        }
    };

    return (
        <Select
            onInputChange={handleInputChange}
            onMenuScrollToBottom={handleMenuScrollToBottom}
            options={options}
            isLoading={isLoading}
            onChange={onChange}
            value={value}
            isClearable
            placeholder="Select supplier..."
            noOptionsMessage={() =>
                isLoading ? 'Loading...' : 'No more options'
            }
        />
    );
};

export default SelectSupplierAsync;
