import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { paymentsAPI } from "../../../features/payments/paymentsAPI";

type CreatePaymentInputs = {
  bookingID: number;
  paymentDate: string;
  amount: number;
  paymentMethod: string;
};

const schema = yup.object({
  bookingID: yup.number().required("Booking ID is required").positive("Booking ID must be positive"),
  paymentDate: yup.string().required("Payment Date is required"),
  amount: yup.number().required("Amount is required").positive("Amount must be positive"),
  paymentMethod: yup.string().max(50, "Max 50 characters").required("Payment Method is required"),
});

const CreatePayment = () => {
  const [createPayment, { isLoading }] = paymentsAPI.useCreatePaymentMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePaymentInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreatePaymentInputs> = async (data) => {
    try {
      await createPayment(data).unwrap();
      toast.success("Payment created successfully");
      reset();
      (document.getElementById("create_payment_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Failed to create payment. Please try again.");
    }
  };

  return (
    <dialog id="create_payment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Payment</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="number"
            {...register("bookingID")}
            placeholder="Booking ID"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.bookingID && (
            <span className="text-sm text-red-700">{errors.bookingID.message}</span>
          )}

          <input
            type="date"
            {...register("paymentDate")}
            placeholder="Payment Date"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.paymentDate && (
            <span className="text-sm text-red-700">{errors.paymentDate.message}</span>
          )}

          <input
            type="number"
            {...register("amount")}
            placeholder="Amount"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.amount && (
            <span className="text-sm text-red-700">{errors.amount.message}</span>
          )}

          <input
            type="text"
            {...register("paymentMethod")}
            placeholder="Payment Method"
            className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
          />
          {errors.paymentMethod && (
            <span className="text-sm text-red-700">{errors.paymentMethod.message}</span>
          )}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-bars loading-xl" /> Creating...
                </>
              ) : (
                "Create"
              )}
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                (document.getElementById("create_payment_modal") as HTMLDialogElement)?.close();
                reset();
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreatePayment;
