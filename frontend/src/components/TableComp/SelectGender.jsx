import React from 'react'
const selectClassName = "p-2 border border-gray-300 rounded-lg w-full md:w-auto focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs"
import { useTranslation } from 'react-i18next'
const SelectGender = ({ gender, setGender }) => {
  const { t } = useTranslation('common')
  return (
    <select
      className={selectClassName}
      name="gender"
      value={gender}
      onChange={(e) => setGender(e.target.value)}
    >
      <option value="">{t("gender.all_genders")}</option>
      <option value="male">{t("gender.male")}</option>
      <option value="female">{t("gender.female")}</option>
    </select>
  )
}

export default SelectGender
