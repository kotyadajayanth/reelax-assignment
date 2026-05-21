import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const states = [
  'Andhra Pradesh', 'Bihar', 'Delhi', 'Goa', 'Gujarat',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'West Bengal'
]

const cities = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
  Delhi: ['New Delhi', 'Dwarka', 'Rohini'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  Telangana: ['Hyderabad', 'Warangal'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
  'West Bengal': ['Kolkata', 'Howrah'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur'],
  Kerala: ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
}

function InputBox({ label, optional, placeholder, value, onChange, type = 'text' }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {optional && <span className="text-gray-400 font-normal"> (Optional)</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 bg-white transition-colors"
      />
    </div>
  )
}

function SelectBox({ label, placeholder, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white appearance-none cursor-pointer text-gray-400 transition-colors pr-8"
          style={{ color: value ? '#1f2937' : '' }}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={15} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

export default function BillingForm({ onCancel, onSave }) {
  const [data, setData] = useState({
    company: 'abhigyan',
    email: 'abhigyan.pandey@getreelax.com',
    gst: '',
    pan: '',
    premise: '',
    street: '',
    state: '',
    city: '',
    country: 'India',
    pin: '',
  })

  const set = (key) => (e) => setData(prev => ({ ...prev, [key]: e.target.value }))

  const availableCities = data.state ? (cities[data.state] || []) : []

  return (
    <div className="bg-white rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Review your details</h1>

      <h2 className="text-sm font-semibold text-gray-800 mt-5 mb-5">Billing Information</h2>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <InputBox label="Company Name" placeholder="abhigyan" value={data.company} onChange={set('company')} />
          <InputBox label="Email" type="email" placeholder="abhigyan.pandey@getreelax.com" value={data.email} onChange={set('email')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputBox label="GST Number" optional placeholder="GST Number" value={data.gst} onChange={set('gst')} />
          <InputBox label="PAN Number" optional placeholder="PAN Number" value={data.pan} onChange={set('pan')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputBox label="Premise/House no." placeholder="Premise/House no." value={data.premise} onChange={set('premise')} />
          <InputBox label="Street" placeholder="Street" value={data.street} onChange={set('street')} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectBox
            label="State"
            placeholder="Select state"
            options={states}
            value={data.state}
            onChange={(e) => setData(prev => ({ ...prev, state: e.target.value, city: '' }))}
          />
          <SelectBox
            label="City"
            placeholder="Select city"
            options={availableCities}
            value={data.city}
            onChange={set('city')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputBox label="Country" placeholder="India" value={data.country} onChange={set('country')} />
          <InputBox label="Pin Code" placeholder="Pincode" value={data.pin} onChange={set('pin')} />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(data)}
          className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Details
        </button>
      </div>
    </div>
  )
}
