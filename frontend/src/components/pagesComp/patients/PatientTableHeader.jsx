import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHeader, TableHead, TableRow } from '@/components/designSystem/table';

const PatientTableHeader = () => {
    const { t } = useTranslation('patients');

    return (
        <TableHeader>
            <TableRow>
                <TableHead>{t('patients_table.name')}</TableHead>
                <TableHead>{t('patients_table.phone')}</TableHead>
                <TableHead>{t('patients_table.email')}</TableHead>
                <TableHead>{t('patients_table.age')}</TableHead>
                <TableHead>{t('patients_table.gender')}</TableHead>
                <TableHead>{t('patients_table.actions')}</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default PatientTableHeader;
