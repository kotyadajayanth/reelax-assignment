import React, { useState } from 'react'
import { Wallet, Tag, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react'

const coupons = [
  { code: 'WELCOME20', label: '20% off on your first month', value: 0.2 },
  { code: 'ANNUAL50', label: '50% off on annual plans', value: 0.5 },
]

export default function OrderSummary() {
  const [couponOpen, setCouponOpen] = useState(true)
  const [inputCode, setInputCode] = useState('')
  const [activeCoupon, setActiveCoupon] = useState('WELCOME20')
  const [walletOn, setWalletOn] = useState(false)

  const subtotal = 14999
  const walletAmt = 500

  const coupon = coupons.find(c => c.code === activeCoupon)
  const couponOff = coupon ? subtotal * coupon.value : 0
  const walletOff = walletOn ? walletAmt : 0
  const afterDiscount = subtotal - couponOff - walletOff
  const tax = afterDiscount * 0.18
  const total = afterDiscount + tax

  function applyInput() {
    const match = coupons.find(c => c.code === inputCode.toUpperCase())
    if (match) setActiveCoupon(match.code)
  }

  function fmt(n) {
    return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
  }

  return (
    <div className="flex flex-col gap-4">

      {/* plan card */}
      <div className="bg-white rounded-2xl p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

        <div className="border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">
                ₹4,999 <span className="text-sm font-normal text-gray-500">/month</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">Includes 5,000 credits/mo.</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-blue-600 tracking-wider mb-1">SELECTED PLAN</p>
              <p className="text-base font-bold text-gray-900">Startup</p>
            </div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <RefreshCw size={13} className="text-blue-600" />
          Upgrade to Growth Plan
        </button>
      </div>

      {/* wallet + coupon card */}
      <div className="bg-white rounded-2xl overflow-hidden">

        {/* wallet row */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Wallet size={18} className="text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Wallet Balance</p>
              <p className="text-xs text-gray-400 mt-0.5">₹{fmt(walletAmt)} available</p>
            </div>
          </div>
          <button
            onClick={() => setWalletOn(!walletOn)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {walletOn ? 'Remove' : 'Apply'}
          </button>
        </div>

        {/* coupon header */}
        <button
          onClick={() => setCouponOpen(!couponOpen)}
          className="w-full flex items-center justify-between px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Tag size={15} className="text-gray-500" />
            <span className="text-sm font-semibold text-gray-800">Apply Coupon</span>
          </div>
          {couponOpen
            ? <ChevronUp size={15} className="text-gray-400" />
            : <ChevronDown size={15} className="text-gray-400" />
          }
        </button>

        {/* coupon dropdown */}
        {couponOpen && (
          <div className="px-5 py-4 border-b border-gray-100 flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 transition-colors"
              />
              <button
                onClick={applyInput}
                className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Apply
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {coupons.map(c => (
                <button
                  key={c.code}
                  onClick={() => setActiveCoupon(activeCoupon === c.code ? '' : c.code)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${
                    activeCoupon === c.code
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">{c.code}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.label}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    activeCoupon === c.code ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {activeCoupon === c.code && (
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* price breakdown */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-800">₹{fmt(subtotal)}</span>
          </div>

          {couponOff > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Coupon ({coupon.code})</span>
              <span className="text-green-600">-₹{fmt(couponOff)}</span>
            </div>
          )}

          {walletOn && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Wallet</span>
              <span className="text-green-600">-₹{fmt(walletOff)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Tax (18% GST)</span>
            <span className="text-gray-800">₹{fmt(tax)}</span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <span className="text-sm font-bold text-gray-900">Total due today</span>
            <span className="text-2xl font-bold text-blue-600">{fmt(total)}</span>
          </div>
        </div>

        {/* pay button */}
        <div className="px-5 pb-5">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 text-sm transition-colors">
            Proceed to Payment
          </button>
        </div>
      </div>

    </div>
  )
}
