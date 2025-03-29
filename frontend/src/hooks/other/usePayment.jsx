import { useState, useEffect, useCallback } from 'react';
import { paymentStatServcie } from '@/services/dentist/paymentStatService';
import _ from 'lodash';

const usePayment = () => {
    const [incomeDate, setIncomeDate] = useState(null);
    const [expensesDate, setExpensesDate] = useState(null);
    const [netProfitDate, setNetProfitDate] = useState(null);
    const [incomeExpenseDate, setIncomeExpenseDate] = useState("7d");
    const [paymentsStat, setPaymentsStat] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPaymentsStat = useCallback(
        _.debounce(async () => {
            setLoading(true);
            setError(null);
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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }, 0), 
        [incomeDate, expensesDate, netProfitDate, incomeExpenseDate]
    );

    useEffect(() => {
        fetchPaymentsStat();
    }, [fetchPaymentsStat]);

    return {
        incomeDate,
        setIncomeDate,
        expensesDate,
        setExpensesDate,
        netProfitDate,
        setNetProfitDate,
        incomeExpenseDate,
        setIncomeExpenseDate,
        paymentsStat,
        loading,
        error,
    };
};

export default usePayment;
