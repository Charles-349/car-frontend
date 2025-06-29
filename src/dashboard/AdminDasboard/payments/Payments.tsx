import { useState } from "react";
import { paymentsAPI, type TPayment } from "../../../features/payments/paymentsAPI";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CreatePayment from "./CreatePayment";
import UpdatePayment from "./UpdatePayment";
import DeletePayment from "./DeletePayment";

const Payments = () => {
  const [selectedPayment, setSelectedPayment] = useState<TPayment | null>(null);
  const [paymentToDelete, setPaymentToDelete] = useState<TPayment | null>(null);
  const [searchID, setSearchID] = useState<string>("");
  const [searchResult, setSearchResult] = useState<TPayment | null>(null);

  const { data: paymentsData, isLoading: paymentsLoading, error: paymentsError } =
    paymentsAPI.useGetPaymentsQuery(undefined, {
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const [getPaymentById] = paymentsAPI.useLazyGetPaymentByIdQuery();

  const handleEdit = (payment: TPayment) => {
    setSelectedPayment(payment);
    (document.getElementById("update_payment_modal") as HTMLDialogElement)?.showModal();
  };

  const handleSearch = async () => {
    if (!searchID.trim()) return;
    try {
      const result = await getPaymentById(parseInt(searchID)).unwrap();
      setSearchResult(result.payment || null);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResult(null);
    }
  };

  return (
    <div>
      <CreatePayment />
      <UpdatePayment payment={selectedPayment} />
      <DeletePayment payment={paymentToDelete} />

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-4 gap-3">
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
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            placeholder="Search Payment ID"
            className="input input-bordered input-sm text-black bg-white"
          />
          <button
            className="btn btn-sm bg-white text-black"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="mb-4 bg-gray-100 p-3 rounded shadow">
          <p><strong>Payment ID:</strong> {searchResult.paymentID}</p>
          <p><strong>Booking ID:</strong> {searchResult.bookingID}</p>
          <p><strong>Payment Date:</strong> {searchResult.paymentDate}</p>
          <p><strong>Amount:</strong> {searchResult.amount}</p>
          <p><strong>Payment Method:</strong> {searchResult.paymentMethod}</p>
        </div>
      )}

      {paymentsLoading && <p>Loading Payments...</p>}
      {paymentsError && <p className="text-red-500">Error fetching payments!</p>}

      {paymentsData && paymentsData.payments && paymentsData.payments.length > 0 ? (
        <div className="md:overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr className="bg-gray-600 text-white text-md lg:text-lg">
                <th className="px-4 py-2">Payment ID</th>
                <th className="px-4 py-2">Booking ID</th>
                <th className="px-4 py-2">Payment Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Payment Method</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paymentsData.payments.map((payment: TPayment) => (
                <tr key={payment.paymentID} className="hover:bg-gray-300 border-b border-gray-400">
                  <td className="px-4 py-2 border-r border-gray-400">{payment.paymentID}</td>
                  <td className="px-4 py-2 border-r border-gray-400">{payment.bookingID}</td>
                  <td className="px-4 py-2 border-r border-gray-400">{payment.paymentDate}</td>
                  <td className="px-4 py-2 border-r border-gray-400">{payment.amount}</td>
                  <td className="px-4 py-2 border-r border-gray-400">{payment.paymentMethod}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="btn btn-sm btn-primary text-blue-500"
                      onClick={() => handleEdit(payment)}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      className="btn btn-sm btn-error text-red-500"
                      onClick={() => {
                        setPaymentToDelete(payment);
                        (document.getElementById("delete_payment_modal") as HTMLDialogElement)?.showModal();
                      }}
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Payments Found.</p>
      )}
    </div>
  );
};

export default Payments;
