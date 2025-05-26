import React from 'react';
import { TableHeader, TableHead, TableRow } from '@/components/designSystem/table';

const StockTableHeader = ({t}) => {

    return (
        <TableHeader>
            <TableRow>
                <TableHead>{t("table_header.medicine")}</TableHead>
                <TableHead>{t("table_header.supplier")}</TableHead>
                <TableHead>{t("table_header.unit")}</TableHead>
                <TableHead>{t("table_header.quantity")}</TableHead>
                <TableHead>{t("table_header.price")}</TableHead>
                <TableHead>{t("table_header.expiry")}</TableHead>
                <TableHead>{t("table_header.status")}</TableHead>
                <TableHead>{t("table_header.actions")}</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default StockTableHeader;
