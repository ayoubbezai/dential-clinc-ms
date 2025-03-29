import React, { Suspense, lazy } from 'react';
import usePayment from '@/hooks/other/usePayment';

// Lazy load components
const PaymentChart = lazy(() => import('@/components/charts/PaymentChart'));
const PaymentCard = lazy(() => import('@/components/small/PaymentCard'));
const RecentTransactions = lazy(() => import('@/components/small/RecentTransactions'));

const Payment = () => {
    const {
        paymentsStat,
        setIncomeExpenseDate,
        incomeExpenseDate,
        setIncomeDate,
        setExpensesDate,
        setNetProfitDate,
        incomeDate,
        expensesDate,
        netProfitDate,
    } = usePayment();

    function changenumberToText(value) {
        const options = {
            "7d": { value: "7d", label: "Last Week" },
            "30d": { value: "30d", label: "Last Month" },
            "90d": { value: "90d", label: "Last 3 Months" },
            "365d": { value: "365d", label: "Last Year" },
            "all": { value: "all", label: "All Time" }
        };
        return options[value] || options["30d"];
    }

    const cardData = [
        {
            title: "Net Earnings",
            amount: paymentsStat?.net_profit || 0,
            comparison: changenumberToText(netProfitDate).label,
            selectedValue: changenumberToText(netProfitDate).value,
            percentage: paymentsStat?.net_profit_percentage,
            isProfit: paymentsStat?.net_profit_percentage > 0,
            setter: setNetProfitDate
        },
        {
            title: "Total Revenue",
            amount: paymentsStat?.income || 0,
            comparison: changenumberToText(incomeDate).label,
            selectedValue: changenumberToText(incomeDate).value,
            percentage: paymentsStat?.income_percentage,
            isProfit: paymentsStat?.income_percentage > 0,
            setter: setIncomeDate
        },
        {
            title: "Total Expenses",
            amount: paymentsStat?.expenses || 0,
            comparison: changenumberToText(expensesDate).label,
            selectedValue: changenumberToText(expensesDate).value,
            percentage: paymentsStat?.expenses_percentage,
            isProfit: paymentsStat?.expenses_percentage > 0,
            setter: setExpensesDate
        },
        {
            title: "Pending Payments",
            amount: paymentsStat?.pending || 0,
            comparison: "All The Time",
            hasMenu: false
        }
    ];

    return (
        <div className="w-full px-8">
            {/* Payment Summary Cards */}
            <div className="grid grid-cols-12 gap-4 my-4">
                {cardData.map((card, index) => (
                    <div key={index} className="col-span-3">
                        <Suspense fallback={<div>Loading...</div>}>
                            <PaymentCard
                                title={card.title}
                                amount={card.amount}
                                comparison={card.comparison}
                                selectedValue={card.selectedValue}
                                percentage={card.percentage}
                                isProfit={card.isProfit}
                                setDate={card.setter}
                                hasMenu={card.hasMenu}
                            />
                        </Suspense>
                    </div>
                ))}
            </div>

            {/* Chart & Recent Transactions */}
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    <Suspense fallback={<div>Loading chart...</div>}>
                        <PaymentChart
                            income_expense_stats={paymentsStat?.income_expense_stats}
                            incomeExpenseDate={incomeExpenseDate}
                            setIncomeExpenseDate={setIncomeExpenseDate}
                        />
                    </Suspense>
                </div>
                <div className="col-span-4">
                    <Suspense fallback={<div>Loading transactions...</div>}>
                        <RecentTransactions transactions={paymentsStat?.transactions} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Payment;
