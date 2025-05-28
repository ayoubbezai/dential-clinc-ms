import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/designSystem/table';

const FolderTableHead = ({ t }) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>{t("folder_table.title")}</TableHead>
        <TableHead>{t("folder_table.price")}</TableHead>
        <TableHead>{t("folder_table.status")}</TableHead>
        <TableHead>{t("folder_table.actions")}</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default FolderTableHead;
