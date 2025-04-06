import React, { useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select'; 
import debounce from 'lodash/debounce';
import { UnitsService } from '@/services/shared/UnitsService';

const SelectUnitAsync = ({ onChange, value }) => {
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
                const { data } = await UnitsService.getAllUnits(page, search);
                const fetched = data?.data.map(unit => ({
                    label: unit.name,
                    value: unit.id,
                })) || [];

                hasMoreRef.current = fetched.length > 0;

                setOptions(prev => (append ? [...prev, ...fetched] : fetched));
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        },0),
        []
    );

    useEffect(() => {
        loadOptions('', 1, false);
    }, [loadOptions]);

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
            placeholder="Select unit..."
            noOptionsMessage={() =>
                isLoading ? 'Loading...' : 'No more options'
            }
        />
    );
};

export default SelectUnitAsync;
