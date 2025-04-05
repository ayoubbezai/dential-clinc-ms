import React, { useCallback, useEffect, useRef, useState } from 'react';
import Creatable from 'react-select/creatable'; // Import Creatable
import { suppliersService } from '@/services/shared/supplierService';
import debounce from 'lodash/debounce';

const SelectSupplierAsync = ({ onChange, value }) => {
    const pageRef = useRef(1);
    const currentSearch = useRef('');
    const hasMoreRef = useRef(true);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);




    const loadOptions = useCallback(
        debounce(async (search, page = 1, append = false) => {
            if (isLoading) return;
            setIsLoading(true);
            try {
                const { data } = await suppliersService.getAllSuppliers(10, search, '', '', page);
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

        }

            , 0), []

    )
    // const loadOptions = async (search, page = 1, append = false) => {
    //     if (isLoading) return;
    //     setIsLoading(true);
    //     try {
    //         const { data } = await suppliersService.getAllSuppliers(1, search, '', '', page);
    //         const fetched = data?.data.map(supplier => ({
    //             label: supplier.name,
    //             value: supplier.id,
    //         })) || [];

    //         hasMoreRef.current = fetched.length > 0;

    //         setOptions(prev =>
    //             append ? [...prev, ...fetched] : fetched
    //         );
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };


    useEffect(() => {
        loadOptions('', 1, false);
    }, [loadOptions]);


    // Debounced search input handler
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

    const handleCreateNewOption = (inputValue) => {
        const newOption = {
            label: inputValue,
            value: inputValue,
        };

        setOptions((prevOptions) => [...prevOptions, newOption]);

        onChange(newOption);

    };

    return (
        <Creatable
            onInputChange={handleInputChange}
            onMenuScrollToBottom={handleMenuScrollToBottom}
            options={options}
            isLoading={isLoading}
            onChange={(selected) => {
                onChange(selected);

            }}
            value={value}
            isClearable
            placeholder="Select or create supplier..."
            noOptionsMessage={() =>
                isLoading ? 'Loading...' : 'No more options'
            }
            onCreateOption={handleCreateNewOption}
        />
    );
};

export default SelectSupplierAsync;
