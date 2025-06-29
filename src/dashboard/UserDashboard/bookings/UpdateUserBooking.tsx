import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { toast } from "sonner";
import { bookingsAPI, type TBooking } from "../../../features/bookings/bookingsAPI";

type UpdateBookingProps = {
    booking: TBooking | null;
    refetch: () => void;
};

type UpdateBookingInputs = {
    bookingID: number;
    carID: number;
    customerID: number;
    rentalStartDate: string;
    rentalEndDate: string;
    totalAmount: number;
};

const schema = yup.object({
    bookingID: yup.number().required("Booking ID is required").positive("Must be positive"),
    carID: yup.number().required("Car ID is required").positive("Must be positive"),
    customerID: yup.number().required("Customer ID is required").positive("Must be positive"),
    rentalStartDate: yup.string().required("Rental start date is required"),
    rentalEndDate: yup.string().required("Rental end date is required"),
    totalAmount: yup.number().required("Total amount is required").positive("Must be positive"),
});

const UpdateUserBooking = ({ booking, refetch }: UpdateBookingProps) => {
    const [updateBooking, { isLoading }] = bookingsAPI.useUpdateBookingMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateBookingInputs>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (booking) {
            setValue("carID", booking.carID);
            setValue("rentalStartDate", booking.rentalStartDate);
            setValue("rentalEndDate", booking.rentalEndDate);
            setValue("totalAmount", booking.totalAmount);
        } else {
            reset();
        }
    }, [booking, setValue, reset]);

    const onSubmit: SubmitHandler<UpdateBookingInputs> = async (data) => {
        try {
            if (!booking) {
                toast.error("No booking selected for update");
                return;
            }
            await updateBooking({ ...data, bookingID: booking.bookingID }).unwrap();
            toast.success("Booking updated successfully");
            reset();
            refetch();
            (document.getElementById("update_modal") as HTMLDialogElement)?.close();
        } catch (error) {
            console.error("Error updating booking:", error);
            toast.error("Failed to update booking. Please try again.");
        }
    };

    return (
        <dialog id="update_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
                <h3 className="font-bold text-lg mb-4">Update Booking</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {errors.bookingID && <span className="text-sm text-red-700">{errors.bookingID.message}</span>}

                    <input
                        type="number"
                        {...register("carID")}
                        placeholder="Car ID"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.carID && <span className="text-sm text-red-700">{errors.carID.message}</span>}
                    {errors.customerID && <span className="text-sm text-red-700">{errors.customerID.message}</span>}

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
                                    <span className="loading loading-bars loading-xl" /> Updating...
                                </>
                            ) : (
                                "Update"
                            )}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                (document.getElementById("update_modal") as HTMLDialogElement)?.close();
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

export default UpdateUserBooking;
