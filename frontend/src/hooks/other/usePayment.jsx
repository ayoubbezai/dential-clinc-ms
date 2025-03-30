import { useState, useEffect, useCallback } from 'react';
import { paymentStatServcie } from '@/services/dentist/paymentStatService';
import { paymentService } from '@/services/dentist/paymentService';
import _ from 'lodash';

const usePayment = () => {
    // Date filters
    const [incomeDate, setIncomeDate] = useState(null);
    const [expensesDate, setExpensesDate] = useState(null);
    const [netProfitDate, setNetProfitDate] = useState(null);
    const [incomeExpenseDate, setIncomeExpenseDate] = useState("7d");

    // Payment Statistics
    const [paymentsStat, setPaymentsStat] = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);

    // All Payments
    const [allPayments, setAllPayments] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [paymentsError, setPaymentsError] = useState(null);

    // Filters for fetching payments
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [type, setType] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sortBy, setSortBy] = useState('created_at');
    const [sortDirection, setSortDirection] = useState('desc');
    const [page, setPage] = useState(1);

    // Fetch Payment Statistics
    const fetchPaymentsStat = useCallback(
        _.debounce(async () => {
            setStatsLoading(true);
            setStatsError(null);
            try {
                const { data, error } = await paymentStatServcie.getPaymnetStat(
                    incomeDate,
                    expensesDate,
                    netProfitDate,
                    incomeExpenseDate
                );
                if (error) throw new Error(error);
                setPaymentsStat(data);
            } catch (err) {
                setStatsError(err.message);
            } finally {
                setStatsLoading(false);
            }
        }, 0), // Debounced for better performance
        [incomeDate, expensesDate, netProfitDate, incomeExpenseDate]
    );

    // Fetch All Payments
    const fetchAllPayments = useCallback(
        _.debounce(async () => {
            setPaymentsLoading(true);
            setPaymentsError(null);
            try {
                const { data, error } = await paymentService.getAllPayments(
                    perPage,
                    search,
                    type,
                    startDate,
                    endDate,
                    sortBy,
                    sortDirection,
                    page
                );
                if (error) throw new Error(error);
                setAllPayments(data.data);
                setPagination(data.pagination)
            } catch (err) {
                setPaymentsError(err.message);
            } finally {
                setPaymentsLoading(false);
            }
        }, 0),
        [perPage, search, type, startDate, endDate, sortBy, sortDirection, page]
    );

    useEffect(() => {
        fetchPaymentsStat();
    }, [fetchPaymentsStat]);

    useEffect(() => {
        fetchAllPayments();
    }, [fetchAllPayments]);

    return {
        // Payment Statistics Data
        incomeDate,
        setIncomeDate,
        expensesDate,
        setExpensesDate,
        netProfitDate,
        setNetProfitDate,
        incomeExpenseDate,
        setIncomeExpenseDate,
        paymentsStat,
        statsLoading,
        statsError,

        // All Payments Data
        allPayments,
        paymentsLoading,
        paymentsError,
        perPage,
        setPerPage,
        search,
        setSearch,
        type,
        setType,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        sortBy,
        setSortBy,
        sortDirection,
        setSortDirection,
        page,
        setPage,
        pagination
    };
};

export default usePayment;
