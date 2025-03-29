import React, { Suspense, lazy } from 'react';
import usePayment from '@/hooks/other/usePayment';
import { Table, TableHeader, TableBody, TableHead, TableCell, TableRow } from '@/components/designSystem/table';
import TableSkeleton from '@/Skeletons/TableSkeleton';
import SearchInTable from '@/components/small/SearchInTable';
import DateInput from '@/components/inputs/DateInput';
import Sort from '@/components/small/Sort';
import PageChange from '@/components/small/PageChange';
import PerPage from '@/components/small/PerPage';
import { Badge } from '@/components/designSystem/badge';

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
    } = usePayment();
    console.log(allPayments)

  
    function getTypeClassName(type) {
        switch (type?.toLowerCase()) {
            case "income":
                return "bg-green-100 text-green-700"; // Green for income
            case "expense":
                return "bg-red-100 text-red-700"; // Red for expense
            case "refund":
                return "bg-yellow-100 text-yellow-700" // Yellow for refund
            default:
                return "bg-gray-100 text-gray-700"; // Default gray
        }
    }
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
        <div className="w-full px-8 mb-4">
            {/* Payment Summary Cards */}
            <div className="grid grid-cols-12 gap-4 my-4">
                {cardData?.map((card, index) => (
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

            {/* Payments Table */}

            <div className='w-full bg-white mx-auto px-8 my-6  rounded-lg shadow-md '>
                <div className='flex flex-wrap items-center justify-between gap-4 py-4 mt-6 '>
                    <SearchInTable search={search} setSearch={setSearch} />
                    <div className='flex flex-wrap items-center gap-2'>
                        <DateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                        
                        <Sort sortBy={sortBy} sortDirection={sortDirection} setSortBy={setSortBy} setSortDirection={setSortDirection} />
                    </div>
                </div>
                <Table className={"my-2"}>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Note</TableHead>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Folder Name</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paymentsLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableSkeleton key={index} />
                            ))
                        ) : paymentsError ? (
                            <TableRow>
                                <TableCell colSpan="6" className="text-center text-red-500">
                                    {paymentsError}
                                </TableCell>
                            </TableRow>
                        ) : allPayments?.length > 0 ? (
                            allPayments?.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>{payment.amount || 'N/A'}</TableCell>
                                    <TableCell>        <Badge
                                                                        variant="default"
                                                                        className={
                                                                            getTypeClassName(payment.type)
                                                                        }
                                                                    >
                                        {payment.type || 'N/A'}
                                                                    </Badge></TableCell>
                                    <TableCell>{payment.note || 'N/A'}</TableCell>
                                    <TableCell>{payment.patient_name || 'N/A'}</TableCell>
                                    <TableCell>{payment.folder_name || 'N/A'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="6" className="text-center text-gray-500">
                                    No payments found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>


                <div className='flex justify-between items-center pb-3 px-4 mt-4'>
                    <PageChange page={page} setPage={setPage} total_pages={pagination.total_pages} loading={paymentsLoading} />
                    <p className='text-[#223354] text-sm '>Page <span className='font-semibold'>{pagination.current_page || 1}</span> of <span className='font-semibold'>{pagination.total_pages || 1}</span></p>
                    <PerPage perPage={perPage} setPerPage={setPerPage} />
                </div>
            </div>

        </div>
    );
};

export default Payment;
