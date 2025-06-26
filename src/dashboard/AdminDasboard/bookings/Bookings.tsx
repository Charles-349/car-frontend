import { useState } from "react";
import { bookingsAPI, type TBooking } from "../../../features/bookings/bookingsAPI";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UpdateBooking from "./UpdateBooking";
import CreateBooking from "./CreateBooking";
import DeleteBooking from "./DeleteBooking";

const Bookings = () => {
    const [selectedBooking, setSelectedBooking] = useState<TBooking | null>(null);
    const [bookingToDelete, setBookingToDelete] = useState<TBooking | null>(null);
    const [searchId, setSearchId] = useState("");
    const [triggerSearch, { data: searchedBooking, isFetching: isSearching, error: searchError }] = bookingsAPI.useLazyGetBookingByIdQuery();

    const { data: bookingsData, isLoading: bookingsLoading, error: bookingsError } = bookingsAPI.useGetBookingsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 10000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const handleEdit = (booking: TBooking) => {
        setSelectedBooking(booking);
        (document.getElementById('update_modal') as HTMLDialogElement)?.showModal();
    };

    const handleSearch = () => {
        if (!searchId.trim()) return;
        triggerSearch(parseInt(searchId));
    };

    return (
        <div>
            <UpdateBooking booking={selectedBooking} />
            <CreateBooking />
            <DeleteBooking booking={bookingToDelete} />

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 mt-4 gap-3">
                <button
                    className="btn bg-gray-600 text-white hover:bg-gray-700 border border-gray-400 rounded-lg px-4 py-2 text-lg"
                    onClick={() => (document.getElementById('create_modal') as HTMLDialogElement)?.showModal()}
                >
                    Create Booking
                </button>
                <div className="flex gap-2">   
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Search Booking by ID"
                    className="input input-bordered p-2 rounded-md bg-white"
                />
                <button className="btn btn-primary bg-white text-black" onClick={handleSearch}>Search</button>
            </div>
            </div>

            {isSearching && <p>Searching for Booking...</p>}
            {searchError && <p className="text-red-500">Booking not found</p>}
            {searchedBooking && searchedBooking.booking && (
                <div className="overflow-x-auto mb-4">
                    <table className="table table-xs">
                        <thead>
                            <tr className="bg-blue-700 text-white text-md">
                                <th>Booking ID</th>
                                <th>Car ID</th>
                                <th>Customer ID</th>
                                <th>Rental Start</th>
                                <th>Rental End</th>
                                <th>Total Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-300 border-b border-gray-400">
                                <td>{searchedBooking.booking.bookingID}</td>
                                <td>{searchedBooking.booking.carID}</td>
                                <td>{searchedBooking.booking.customerID}</td>
                                <td>{searchedBooking.booking.rentalStartDate}</td>
                                <td>{searchedBooking.booking.rentalEndDate}</td>
                                <td>{searchedBooking.booking.totalAmount}</td>
                                <td className="flex">
                                    <button className="btn btn-sm btn-primary mr-4 text-blue-500" onClick={() => handleEdit(searchedBooking.booking)}>
                                        <FaEdit size={20} />
                                    </button>
                                    <button className="btn btn-sm btn-danger text-red-500" onClick={() => {
                                        setBookingToDelete(searchedBooking.booking);
                                        (document.getElementById('delete_modal') as HTMLDialogElement)?.showModal();
                                    }}>
                                        <MdDeleteForever size={20} />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {bookingsLoading && <p>Loading Bookings...</p>}
            {bookingsError && <p className="text-red-500">Error fetching bookings!</p>}

            {bookingsData && bookingsData.bookings && bookingsData.bookings.length > 0 ? (
                <div className="md:overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr className="bg-gray-600 text-white text-md lg:text-lg">
                                <th>Booking ID</th>
                                <th>Car ID</th>
                                <th>Customer ID</th>
                                <th>Rental Start</th>
                                <th>Rental End</th>
                                <th>Total Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingsData.bookings.map((booking: TBooking) => (
                                <tr key={booking.bookingID} className="hover:bg-gray-300 border-b border-gray-400">
                                    <td>{booking.bookingID}</td>
                                    <td>{booking.carID}</td>
                                    <td>{booking.customerID}</td>
                                    <td>{booking.rentalStartDate}</td>
                                    <td>{booking.rentalEndDate}</td>
                                    <td>{booking.totalAmount}</td>
                                    <td className="flex">
                                        <button className="btn btn-sm btn-primary mr-4 text-blue-500" onClick={() => handleEdit(booking)}>
                                            <FaEdit size={20} />
                                        </button>
                                        <button className="btn btn-sm btn-danger text-red-500" onClick={() => {
                                            setBookingToDelete(booking);
                                            (document.getElementById('delete_modal') as HTMLDialogElement)?.showModal();
                                        }}>
                                            <MdDeleteForever size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No Bookings Found.</p>
            )}
        </div>
    );
};

export default Bookings;
