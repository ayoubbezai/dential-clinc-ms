import React from 'react'
import { TableHeader, TableHead, TableRow } from '@/components/designSystem/table';

const MedicinesTableHeader = ({ t }) => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>{t("medicines.name")}</TableHead>
                <TableHead>{t("medicines.category")}</TableHead>
                <TableHead>{t("medicines.description")}</TableHead>
                <TableHead>{t("medicines.low_stock")}</TableHead>
                <TableHead>{t("medicines.medium_stock")}</TableHead>
                <TableHead>{t("medicines.good_stock")}</TableHead>
                <TableHead>{t("medicines.action")}</TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default MedicinesTableHeader
