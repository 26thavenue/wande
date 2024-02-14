'use client'

import React from 'react'

const page = () => {

  return (
    <div className="w-80 p-4 bg-white border border-gray-200 rounded mx-auto mt-20 shadow-sm hover:scale-125 hover:rotate-2 transition ">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold">Receipt</h2>
        <p className="text-sm">Date: January 1, 2023</p>
      </div>
      <div className="flex justify-between mb-2">
        <span>Item 1</span>
        <span>$10.00</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Item 2</span>
        <span>$15.00</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Item 3</span>
        <span>$20.00</span>
      </div>
      <hr className="my-2 border-t border-gray-200" />
      <div className="flex justify-between font-semibold">
        <span>Total:</span>
        <span>$45.00</span>
      </div>
    </div>
  )
}

export default page