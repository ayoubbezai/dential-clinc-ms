import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHeader, TableRow, TableHead } from '@/components/designSystem/table';

const AppointmentTableHeader = () => {
    const { t } = useTranslation('appointments'); 
    return (
        <TableHeader>
            <TableRow>
                <TableHead>{t('header.title')}</TableHead>
                <TableHead>{t('header.tooth')}</TableHead>
                <TableHead>{t('header.content')}</TableHead>
                <TableHead>{t('header.date')}</TableHead>
                <TableHead>{t('header.status')}</TableHead>
                <TableHead>{t('header.actions')}</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default AppointmentTableHeader;
