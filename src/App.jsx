import React from 'react'
import BillingForm from './components/BillingForm'
import OrderSummary from './components/OrderSummary'

export default function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 lg:p-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 items-start">
        <BillingForm
          onCancel={() => console.log('cancelled')}
          onSave={(d) => console.log('saved', d)}
        />
        <OrderSummary />
      </div>
    </div>
  )
}
