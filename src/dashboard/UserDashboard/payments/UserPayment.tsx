import { useState } from "react";
import { paymentsAPI, type TPayment } from "../../../features/payments/paymentsAPI";
import CreatePayment from "./CreatePayment";

const UserPayment = () => {
  const [customerId, setCustomerId] = useState<string>("");
  const [trigger, { data, isLoading, error }] = paymentsAPI.useLazyGetPaymentsByCustomerIdQuery();

  const handleFetch = async () => {
    if (!customerId.trim()) return;
    try {
      await trigger(parseInt(customerId)).unwrap();
    } catch (err) {
      console.error("Error fetching customer payments:", err);
    }
  };

  return (
    <div className="mt-4">
      <CreatePayment />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <button
          className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2 text-lg"
          onClick={() =>
            (document.getElementById("create_payment_modal") as HTMLDialogElement)?.showModal()
          }
        >
          Create Payment
        </button>

        <div className="flex gap-2">
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter Customer ID"
            className="input input-bordered input-sm text-black bg-white"
          />
          <button
            className="btn btn-sm bg-gray-600 text-white"
            onClick={handleFetch}
          >
            Get Payments
          </button>
        </div>
      </div>

      {isLoading && <p>Loading customer payments...</p>}
      {error && <p className="text-red-500">Error fetching payments.</p>}

      {data?.payments && data.payments.length > 0 ? (
        <div className="md:overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="bg-gray-600 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Payment ID</th>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Payment Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {data.payments.map((payment: TPayment) => (
                <tr key={payment.paymentID} className="hover:bg-gray-300 border-b border-gray-400">
                  <td className="px-4 py-2 border-r border-gray-400">{payment.paymentID}</td>
                  <td className="px-4 py-2 border-r border-gray-400">{payment.bookingID}</td>
                  <td className="px-4 py-2 border-r border-gray-400">{payment.paymentDate}</td>
                  <td className="px-4 py-2 border-r border-gray-400">{payment.amount}</td>
                  <td className="px-4 py-2 border-r border-gray-400">{payment.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-700">No Payments Found for this Customer.</p>
      )}
    </div>
  );
};


export default UserPayment;
