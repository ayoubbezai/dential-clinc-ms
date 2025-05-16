import React from 'react';
import { useTranslation } from 'react-i18next';
import { TableHeader, TableHead, TableRow } from '@/components/designSystem/table';

const UserTableHeader = () => {
    const { t } = useTranslation('users');

    return (
        <TableHeader>
            <TableRow>
                <TableHead>{t('header.name')}</TableHead>
                <TableHead>{t('header.email')}</TableHead>
                <TableHead>{t('header.role')}</TableHead>
                <TableHead>{t('header.created_date')}</TableHead>
                <TableHead>{t('header.actions')}</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default UserTableHeader;
