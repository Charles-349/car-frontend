// import { useState } from "react";
// import { carsAPI, type TCar } from "../../../features/cars/carsAPI"
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";
// import UpdateCar from "./UpdateCar";
// import CreateCar from "./CreateCar";
// import DeleteCar from "./DeleteCar";
// // import type { RootState } from "../../../app/store";
// // import { useSelector } from "react-redux";


// const Cars = () => {
//     const [selectedCar, setSelectedCar] = useState<TCar | null>(null)
//     const [carToDelete, setCarToDelete] = useState<TCar | null>(null);

// //       const user = useSelector((state: RootState) => state.user.customer);


// //   if (!user || user.role !== 'user') {
// //     return <p className="text-red-500 font-semibold text-lg">Access Denied: Users only.</p>;
// //   }
//     const { data: carsData, isLoading:carsLoading, error:carError } = carsAPI.useGetCarsQuery(
//         undefined,
//         {
//             refetchOnMountOrArgChange: true,
//             pollingInterval: 10000, // Poll every 10 seconds
//             refetchOnFocus: true,
//             refetchOnReconnect: true,
//         }
//     );
//      const handleEdit = (car:TCar) => {
//         setSelectedCar(car);
//         (document.getElementById('update_modal') as HTMLDialogElement)?.showModal();

//     }
//     console.log("Cars" , carsData)
//   return (
//     <div>
//         <UpdateCar car = {selectedCar}/>
//         <CreateCar/>
//         <DeleteCar car = {carToDelete}/>
//         <div className="flex justify-center mb-3 mt-4">
//             <button
//             className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2 text-lg"
//             onClick={() => (document.getElementById('create_modal') as HTMLDialogElement)?.showModal()}
//             >Create Car</button>
//         </div>


//         {carsLoading && <p>Loading Cars...</p>}
//         {carError && <p className="text-red-500">Error Fetching Cars!</p>}

//         {carsData && carsData.cars && carsData.cars.length > 0 ? (
//            <div className="md:overflow-x-auto">
//                     <table className="table table-xs">
//                         <thead>
//                             <tr className=" bg-gray-600 text-white text-md lg:text-lg">
//                                 <th className="px-4 py-2">Car Model</th>
//                                 <th className="px-4 py-2">Year</th>
//                                 <th className="px-4 py-2">Color</th>
//                                 <th className="px-4 py-2">Rental Rate</th>
//                                 <th className="px-4 py-2">Availability</th>
//                                 <th className="px-4 py-2">Location ID</th>
//                                 <th className="px-4 py-2">Actions</th>

//                             </tr>
//                         </thead>
//                         <tbody>
//                             {carsData.cars.map((car: TCar) => (
//                                 <tr key={car.carID} className="hover:bg-gray-300 border-b border-gray-400 ">
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base  ">{car.carModel}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{car.year}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{car.color}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{car.rentalRate}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{car.availability.toString()}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{car.locationID}</td>
//                                     {/* Actions to delete and Edit */}
//                                     <td className="px-4 py-2 flex">
//                                         <button className="btn btn-sm btn-primary mr-4 text-blue-500"
//                                             onClick={() => {
//                                                 handleEdit(car);
//                                             (document.getElementById("update_modal") as HTMLDialogElement).showModal();
//                                             }}
//                                         >
//                                             <FaEdit size={20} />
//                                         </button>
//                                         <button className="btn btn-sm btn-danger text-red-500"
//                                             onClick={() => {
//                                                 setCarToDelete(car);
//                                                 (document.getElementById('delete_modal') as HTMLDialogElement)?.showModal();
//                                             }}
//                                         >

//                                             <MdDeleteForever size={20} />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p>No Cars Found.</p>
//             )}
//         </div>
//     )
// }
// export default Cars



import { useState } from "react";
import { carsAPI, type TCar } from "../../../features/cars/carsAPI"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UpdateCar from "./UpdateCar";
import CreateCar from "./CreateCar";
import DeleteCar from "./DeleteCar";

const Cars = () => {
    const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
    const [carToDelete, setCarToDelete] = useState<TCar | null>(null);
    const [searchID, setSearchID] = useState<string>("");
    const [searchResult, setSearchResult] = useState<TCar | null>(null);

    const { data: carsData, isLoading: carsLoading, error: carError } = carsAPI.useGetCarsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const [getCarById] = carsAPI.useLazyGetCarByIdQuery();

    const handleEdit = (car: TCar) => {
        setSelectedCar(car);
        (document.getElementById('update_modal') as HTMLDialogElement)?.showModal();
    };

    const handleSearch = async () => {
        if (!searchID.trim()) return;
        try {
            const result = await getCarById(parseInt(searchID)).unwrap();
            setSearchResult(result.car || null);
        } catch (err) {
            console.error("Search error:", err);
            setSearchResult(null);
        }
    };

    return (
        <div>
            <UpdateCar car={selectedCar} />
            <CreateCar />
            <DeleteCar car={carToDelete} />

            {/* Top Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-4 gap-3">
                <button
                    className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2 text-lg"
                    onClick={() => (document.getElementById('create_modal') as HTMLDialogElement)?.showModal()}
                >
                    Create Car
                </button>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchID}
                        onChange={(e) => setSearchID(e.target.value)}
                        placeholder="Search by ID"
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
                    <p><strong>Car ID:</strong> {searchResult.carID}</p> 
                    <p><strong>Car Model:</strong> {searchResult.carModel}</p>
                    <p><strong>Year:</strong> {searchResult.year}</p>
                    <p><strong>Color:</strong> {searchResult.color}</p>
                    <p><strong>Rental Rate:</strong> {searchResult.rentalRate}</p>
                    <p><strong>Availability:</strong> {searchResult.availability.toString()}</p>
                    <p><strong>Location ID:</strong> {searchResult.locationID}</p>
                </div>
            )}

            {carsLoading && <p>Loading Cars...</p>}
            {carError && <p className="text-red-500">Error Fetching Cars!</p>}

            {carsData && carsData.cars && carsData.cars.length > 0 ? (
                <div className="md:overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr className="bg-gray-600 text-white text-md lg:text-lg">
                                <th className="px-4 py-2">Car ID</th>
                                <th className="px-4 py-2">Car Model</th>
                                <th className="px-4 py-2">Year</th>
                                <th className="px-4 py-2">Color</th>
                                <th className="px-4 py-2">Rental Rate</th>
                                <th className="px-4 py-2">Availability</th>
                                <th className="px-4 py-2">Location ID</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carsData.cars.map((car: TCar) => (
                                <tr key={car.carID} className="hover:bg-gray-300 border-b border-gray-400">
                                    <td className="px-4 py-2 border-r border-gray-400">{car.carID}</td>
                                    <td className="px-4 py-2 border-r border-gray-400">{car.carModel}</td>
                                    <td className="px-4 py-2 border-r border-gray-400">{car.year}</td>
                                    <td className="px-4 py-2 border-r border-gray-400">{car.color}</td>
                                    <td className="px-4 py-2 border-r border-gray-400">{car.rentalRate}</td>
                                    <td className="px-4 py-2 border-r border-gray-400">{car.availability.toString()}</td>
                                    <td className="px-4 py-2 border-r border-gray-400">{car.locationID}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="btn btn-sm btn-primary text-blue-500"
                                            onClick={() => handleEdit(car)}
                                        >
                                            <FaEdit size={20} />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error text-red-500"
                                            onClick={() => {
                                                setCarToDelete(car);
                                                (document.getElementById('delete_modal') as HTMLDialogElement)?.showModal();
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
                <p>No Cars Found.</p>
            )}
        </div>
    );
};

export default Cars;
