import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { bookingsAPI } from "../../../features/bookings/bookingsAPI";

type CreateBookingInputs = {
    carID: number;
    customerID: number;
    rentalStartDate: string;
    rentalEndDate: string;
    totalAmount: number;
};

const schema = yup.object({
    carID: yup.number().required("Car ID is required").positive("Car ID must be positive"),
    customerID: yup.number().required("Customer ID is required").positive("Customer ID must be positive"),
    rentalStartDate: yup.string().required("Start Date is required"),
    rentalEndDate: yup.string().required("End Date is required"),
    totalAmount: yup.number().required("Total Amount is required").positive("Amount must be positive"),
});

const CreateBooking = () => {
    const [createBooking, { isLoading }] = bookingsAPI.useCreateBookingMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateBookingInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateBookingInputs> = async (data) => {
        try {
            await createBooking(data).unwrap();
            toast.success("Booking created successfully");
            reset();
            (document.getElementById("create_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error creating a booking:", error);
            toast.error("Failed to create booking. Please try again.");
        }
    };

    return (
        <dialog id="create_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg mb-4">Create Booking</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="number"
                        {...register("carID")}
                        placeholder="Car ID"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.carID && (
                        <span className="text-sm text-red-700">{errors.carID.message}</span>
                    )}

                    <input
                        type="number"
                        {...register("customerID")}
                        placeholder="Customer ID"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.customerID && (
                        <span className="text-sm text-red-700">{errors.customerID.message}</span>
                    )}

                    <input
                        type="date"
                        {...register("rentalStartDate")}
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.rentalStartDate && (
                        <span className="text-sm text-red-700">{errors.rentalStartDate.message}</span>
                    )}

                    <input
                        type="date"
                        {...register("rentalEndDate")}
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.rentalEndDate && (
                        <span className="text-sm text-red-700">{errors.rentalEndDate.message}</span>
                    )}

                    <input
                        type="number"
                        step="0.01"
                        {...register("totalAmount")}
                        placeholder="Total Amount"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.totalAmount && (
                        <span className="text-sm text-red-700">{errors.totalAmount.message}</span>
                    )}

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="loading loading-bars loading-xl" /> Creating...
                                </>
                            ) : "Create"}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                (document.getElementById("create_modal") as HTMLDialogElement)?.close();
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

export default CreateBooking;
