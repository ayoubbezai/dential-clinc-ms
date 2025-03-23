import React from 'react'
import PaymentChart from '@/components/charts/PaymentChart'
import { Card } from '@/components/designSystem/card'
import PaymentCard from '@/components/small/PaymentCard'
import RecentTransactions from '@/components/small/RecentTransactions'


const cardData = [
    { title: "Total Saving", amount: "3,375", comparison: "vs last month", percentage: "26%", isProfit: false },
    { title: "Total Income", amount: "5,600", comparison: "vs last month", percentage: "18%", isProfit: true },
    { title: "Total Expenses", amount: "2,250", comparison: "vs last month", percentage: "10%", isProfit: false },
    { title: "Investments", amount: "1,500", comparison: "vs last month", percentage: "8%", isProfit: true }
]

const Payment = () => {
    return (
        <div className="w-full px-8">
            {/* first row in the page */}
            <div className="grid grid-cols-12 gap-4 my-4 ">

                {cardData.map((card, index) => (

                    <div key={index} className="col-span-3">
                        <PaymentCard
                            title={card.title}
                            amount={card.amount}
                            comparison={card.comparison}
                            percentage={card.percentage}
                            isProfit={card.isProfit}
                        />
                    </div>
                ))}
            </div>

            {/* secend row  */}
            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-8">
                    <PaymentChart />
                </div>

                <div className="col-span-4">
                    <RecentTransactions />
                </div>
            </div>
        </div>
    )
}

export default Payment
