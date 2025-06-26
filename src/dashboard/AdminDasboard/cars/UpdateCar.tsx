import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { carsAPI, type TCar } from "../../../features/cars/carsAPI";
import { useEffect } from "react";
import { toast } from "sonner";

type UpdateCarProps = {
    car:TCar | null
}

type UpdateCarInputs = {
    carID: number;
    carModel: string;
    year: string;
    color: string;
    rentalRate: number;
    availability: boolean;
    locationID: number;
}
const schema = yup.object({
    carID: yup.number().required("Car ID is required").positive("Car ID must be positive"),
    carModel: yup.string().max(20, "Max 20 characters").required("Car Model is required"),
    year: yup.string().max(10, "Max 10 characters").required("Year is required"),
    color: yup.string().max(10, "Max 10 characters").required("Color is required"),
    rentalRate: yup.number().required("Rental Rate is required").positive("Rental Rate must be positive"),
    availability: yup.boolean().default(true).required("Availability is required"),
    locationID: yup.number().required("Location ID is required").positive("Location ID must be positive"),

})
const UpdateCar = ({car}:UpdateCarProps) => {
    const [UpdateCar, {isLoading}] = carsAPI.useUpdateCarMutation()
     const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<UpdateCarInputs>({
        resolver: yupResolver(schema),
    });
    useEffect(()=>{
        if(car) {
            setValue("carID", car.carID)
            setValue("carModel", car.carModel)
            setValue("year", car.year)
            setValue("color", car.color)
            setValue("rentalRate", car.rentalRate)
            setValue("availability", car.availability)
            setValue("locationID", car.locationID)
        } else 
        reset()
    }, [car, setValue, reset]);
    const onSubmit:SubmitHandler<UpdateCarInputs> = async (data) =>{
    try {
        if(!car){
            toast.error("No car selected for update")
            return;
        }
        const response = await UpdateCar({ ...data, carID: car.carID });
        console.log("Todo updated successfully", response);
        reset();
        (document.getElementById('update_modal') as HTMLDialogElement)?.close();
        
    } catch (error) {
        console.error("Error updating todo:", error);
            toast.error("Failed to update todo. Please try again.");
        
    }
    }
  return (
   <dialog id="update_modal" className="modal sm:modal-middle">
            <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">

                <h3 className="font-bold text-lg mb-4">Update Car</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register("carID")}
                        placeholder="car ID"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.carID && (
                        <span className="text-sm text-red-700">{errors.carID.message}</span>
                    )}

                    <input
                        type="text"
                        {...register("carModel")}
                        placeholder="Car Model"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.carModel && (
                        <span className="text-sm text-red-700">{errors.carModel.message}</span>
                    )}
                   
                    <input
                        type=""
                        {...register("year")}
                        placeholder="Year"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.year && (
                        <span className="text-sm text-red-700">{errors.year.message}</span>
                    )}
                     <input
                        type="text"
                        {...register("color")}
                        placeholder="Color"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                        />
                    {errors.color && (
                        <span className="text-sm text-red-700">{errors.color.message}</span>
                    )}
                    <input
                        type="number"
                        {...register("rentalRate")}
                        placeholder="Rental Rate"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.rentalRate && (
                        <span className="text-sm text-red-700">{errors.rentalRate.message}</span>
                    )}
                     <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-4 text-white">Availability</span>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="true"
                                        {...register("availability")}
                                        className="radio radio-primary text-green-400"
                                    />
                                    True
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        {...register("availability")}
                                        className="radio radio-primary text-yellow-400"
                                    />
                                    False
                                </label>
                            </div>
                        </label>
                    </div>
                    {errors.availability && (
                        <span className="text-sm text-red-700">{errors.availability.message}</span>
                    )}
                    <input
                        type="number"
                        {...register("locationID")}
                        placeholder="Location ID"
                        className="input rounded w-full p-2 focus:ring-2 focus:ring-blue-500 text-lg bg-white text-gray-800"
                    />
                    {errors.locationID && (
                        <span className="text-sm text-red-700">{errors.locationID.message}</span>
                    )}

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="loading loading-bars loading-xl" /> Updating...
                                </>
                            ) : "Update"}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                (document.getElementById('update_modal') as HTMLDialogElement)?.close();
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

export default UpdateCar
