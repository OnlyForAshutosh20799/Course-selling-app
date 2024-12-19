import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

function PaymentHostory() {
  const [paymentlist, setPaymentList] = useState([])



  useEffect(() => {
    getPaymentHistory()
  }, [])


  const getPaymentHistory = () => {
    axios.get(`https://insituite-management-backend.onrender.com/fee/payment-history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('stoken')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        console.log("H", res.data)
        setPaymentList(res.data.paymetHostory.reverse())
      })
      .catch(err => {
        console.log(err)
        // toast.error("failed")
      })
  }


  return (
    <>
      <h1 className='text-center text-md md:text-lg font-semibold md:font-bold my-2 md:my-4 '>Payment History </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full  ">
          <thead>
            <tr className="bg-[#482894c9] text-white">
              <th className=" px-4 py-2 text-left">Full Name</th>
              <th className=" px-4 py-2 text-left">Phone</th>
              <th className=" px-4 py-2 text-left">Amount</th>
              <th className=" px-4 py-2 text-left">Remark</th>
              <th className=" px-4 py-2 text-left">Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {paymentlist && paymentlist.length > 0 ? (
              paymentlist.map((fee) => (
                <tr key={fee._id} className="hover:bg-[#492894] hover:text-white cursor-pointer transition ">
                  <td className=" px-4 py-2">{fee.fullName}</td>
                  <td className=" px-4 py-2">{fee.phone}</td>
                  <td className=" px-4 py-2">{fee.amount}</td>
                  <td className=" px-4 py-2">{fee.remark}</td>
                  <td className=" px-4 py-2">
                    {new Date(fee.createdAt).toLocaleString()}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No Fee Details Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PaymentHostory