import React, { Suspense, lazy, useState } from 'react';
import usePayment from '@/hooks/other/usePayment';
import SearchInTable from '@/components/TableComp/SearchInTable';
import DateInput from '@/components/inputs/DateInput';
import PageChange from '@/components/TableComp/PageChange';
import PerPage from '@/components/TableComp/PerPage';
import SortDirection from '@/components/TableComp/SortDirection';
import { paymentCardData } from '@/utils/help/paymentsHelp';
import SortByPaymentTable from '@/components/pagesComp/payments/SortByPaymentTable';
import FilterByTypePayment from '@/components/pagesComp/payments/FilterByTypePayment';
import PaymentsTable from '@/components/pagesComp/payments/PaymentsTable';
import AddButton from '@/components/small/AddButton';
import { useTranslation } from 'react-i18next';

// Lazy load components
const PaymentChart = lazy(() => import('@/components/charts/PaymentChart'));
const PaymentCard = lazy(() => import('@/components/pagesComp/payments/PaymentCard'));
const RecentTransactions = lazy(() => import('@/components/pagesComp/payments/RecentTransactions'));
const AddPaymentModel = lazy(() => import('@/models/AddModels/AddPaymentExpense'));

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
        pagination,
        fetchAllPayments
    } = usePayment();
    console.log(allPayments)
    const [isPaymentModelOpen, setIsPaymentModelOpen] = useState(false);
    const { t } = useTranslation("payments");
    const { t: tCommon } = useTranslation("common");
    const cardData = paymentCardData(paymentsStat,
        netProfitDate,
        setNetProfitDate,
        incomeDate,
        setIncomeDate,
        expensesDate,
        setExpensesDate, t)




    return (
        <>
            <div className="w-full px-8 mb-4">
                {/* Payment Summary Cards */}


                <div className="grid grid-cols-12 gap-4 my-4">
                    {cardData?.map((card, index) => (
                        <div key={index} className="col-span-3 flex">
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
                                t={t}
                            />
                        </Suspense>
                    </div>
                    <div className="col-span-4">
                        <Suspense fallback={<div>Loading transactions...</div>}>
                            <RecentTransactions transactions={paymentsStat?.transactions} isLoading={paymentsLoading} t={t} />
                        </Suspense>
                    </div>
                </div>

                {/* Payments Table */}


                <div className='w-full bg-white mx-auto px-8 my-6  rounded-lg shadow-md '>
                    <div className='flex flex-wrap items-center justify-between  py-4 mt-6 '>
                        <SearchInTable search={search} setSearch={setSearch} />
                        <div className='flex  items-center gap-1'>
                            <DateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                            <FilterByTypePayment type={type} setType={setType} t={t} />
                            <SortByPaymentTable sortBy={sortBy} setSortBy={setSortBy} t={t} />
                            <SortDirection sortDirection={sortDirection} setSortDirection={setSortDirection} />
                            <AddButton onClick={() => setIsPaymentModelOpen(true)} />

                        </div>
                        <PaymentsTable allPayments={allPayments} paymentsLoading={paymentsLoading} paymentsError={paymentsError} />
                    </div>


                    <div className='flex justify-between items-center pb-3 px-4 mt-4'>
                        <PageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={paymentsLoading} />
                        <p className='text-[#223354] text-sm '>{tCommon("Page")} <span className='font-semibold'>{pagination.current_page || 1}</span> {tCommon("of")} <span className='font-semibold'>{pagination.total_pages || 1}</span></p>
                        <PerPage perPage={perPage} setPerPage={setPerPage} />
                    </div>
                </div>

            </div>
            {isPaymentModelOpen && (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddPaymentModel isOpen={isPaymentModelOpen} onClose={() => setIsPaymentModelOpen(false)} refetch={fetchAllPayments} />
                </Suspense>
            )}
        </>
    );
};

export default Payment;
