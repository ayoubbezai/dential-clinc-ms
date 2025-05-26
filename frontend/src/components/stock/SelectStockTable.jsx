import React from 'react';

const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs";

const SelectStockTable = ({ stockStatus, setStockStatus ,t}) => {

  return (
    <select
      className={selectClassName}
      name="stockStatus"
      value={stockStatus}
      onChange={(e) => setStockStatus(e.target.value)}
    >
      <option value="">{t("status.all")}</option>
      <option value="very_good">{t("status.very_good")}</option>
      <option value="good">{t("status.good")}</option>
      <option value="medium">{t("status.medium")}</option>
      <option value="low">{t("status.low")}</option>
      <option value="unknown">{t("status.unknown")}</option>
      <option value="out_of_stock">{t("status.out_of_stock")}</option>
    </select>
  );
};

export default SelectStockTable;
