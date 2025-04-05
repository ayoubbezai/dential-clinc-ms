import React, { useEffect, useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { suppliersService } from '@/services/shared/supplierService';
import debounce from 'lodash/debounce';

const SelectSupplierAsync = ({ onChange, value }) => {
  const pageRef = useRef(1);
  const currentSearch = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedOptions, setLoadedOptions] = useState([]);

  // 🔁 Load initial options on mount
  useEffect(() => {
    fetchInitialOptions();
  }, []);

  const fetchInitialOptions = async () => {
    setIsLoading(true);
    try {
      const { data } = await suppliersService.getAllSuppliers(1, '', "", "", 1);
      const initialOptions = data?.data.map(supplier => ({
        label: supplier.name,
        value: supplier.id,
      })) || [];

      setLoadedOptions(initialOptions);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadOptions = async (searchValue, { page }, append = false) => {
    setIsLoading(true);
    try {
      const { data } = await suppliersService.getAllSuppliers(1, searchValue, "", "", page);

      const newOptions = data?.data.map(supplier => ({
        label: supplier.name,
        value: supplier.id,
      })) || [];

      const updatedOptions = append ? [...loadedOptions, ...newOptions] : newOptions;

      setLoadedOptions(updatedOptions);
      setIsLoading(false);
      return updatedOptions;
    } catch (error) {
      console.error('Error loading suppliers:', error);
      setIsLoading(false);
      return [];
    }
  };

  const debouncedLoadOptions = debounce((inputValue, callback) => {
    currentSearch.current = inputValue;
    pageRef.current = 1;
    loadOptions(inputValue, { page: 1 }).then(callback);
  }, 0);

  const handleScroll = () => {
    if (!isLoading) {
      pageRef.current += 1;
      loadOptions(currentSearch.current, { page: pageRef.current }, true);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={loadedOptions} 
      loadOptions={(inputValue, callback) => {
        debouncedLoadOptions(inputValue, callback);
      }}
      onMenuScrollToBottom={handleScroll}
      onChange={onChange}
      value={value}
      isLoading={isLoading}
      getOptionLabel={(e) => e.label}
      getOptionValue={(e) => e.value}
      noOptionsMessage={() => (isLoading ? 'Loading...' : 'No options available')}
    />
  );
};

export default SelectSupplierAsync;
