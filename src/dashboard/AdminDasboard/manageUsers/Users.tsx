
// import { useState, useEffect } from "react";
// import ChangeRole from "./ChangeRole";
// import { userAPI, type TCustomer } from "../../../features/users/userAPI";

// const Users = () => {
//     const { data: usersData, isLoading, error } = userAPI.useGetUsersQuery(undefined, {
//         refetchOnMountOrArgChange: true,
//         pollingInterval: 60000,
//     });

//     const [selectedUser, setSelectedUser] = useState<TCustomer | null>(null);

//     useEffect(() => {
//         console.log("Fetched usersData:", usersData);
//     }, [usersData]);

//     return (
//         <div>
//             <ChangeRole user={selectedUser} />

//             {isLoading && <p>Loading users...</p>}
//             {error && <p className="text-red-500">Error fetching users</p>}

//             {!isLoading && usersData && usersData.length > 0 ? (
//                 <div className="overflow-x-auto">
//                     <table className="table table-xs">
//                         <thead>
//                             <tr className="bg-gray-600 text-white text-md lg:text-lg">
//                                 <th className="px-4 py-2">First Name</th>
//                                 <th className="px-4 py-2">Last Name</th>
//                                 <th className="px-4 py-2">Email</th>
//                                 <th className="px-4 py-2">Phone Number</th>
//                                 <th className="px-4 py-2">Address</th>
//                                 <th className="px-4 py-2">Role</th>
//                                 <th className="px-4 py-2">Verified</th>
//                                 <th className="px-4 py-2">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {usersData.map((user) => (
//                                 <tr key={user.customerID} className="hover:bg-gray-300 border-b border-gray-400">
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.firstName}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.lastName}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.email}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.phoneNumber}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.address}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.role}</td>
//                                     <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
//                                         <span className={`badge ${user.isVerified ? "badge-success" : "badge-warning"}`}>
//                                             <span className={`lg:text-base ${user.isVerified ? "text-green-700" : "text-yellow-700"}`}>
//                                                 {user.isVerified ? "Verified" : "Not Verified"}
//                                             </span>
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-2">
//                                         <button
//                                             className="btn btn-sm btn-primary text-blue-500 p-4 "
//                                             onClick={() => {
//                                                 setSelectedUser(user);
//                                                 (document.getElementById("role_modal") as HTMLDialogElement)?.showModal();
//                                             }}
//                                         >
//                                             Change Role
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p>No users found.</p>
//             ) }
//         </div>
//     );
// };

// export default Users;


import { useState, useEffect } from "react";
import ChangeRole from "./ChangeRole";
import { userAPI, type TCustomer } from "../../../features/users/userAPI";

const Users = () => {
    const { data: usersData, isLoading, error } = userAPI.useGetUsersQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000,
    });

    const [searchID, setSearchID] = useState<string>("");
    const [searchResult, setSearchResult] = useState<TCustomer | null>(null);

    const [getUserById] = userAPI.useLazyGetUserByIdQuery();
    const [selectedUser, setSelectedUser] = useState<TCustomer | null>(null);

    useEffect(() => {
        console.log("Fetched usersData:", usersData);
    }, [usersData]);

    const handleSearch = async () => {
        if (!searchID.trim()) return;
        try {
            const result = await getUserById(parseInt(searchID)).unwrap();
            setSearchResult(result.customer || null);
        } catch (err) {
            console.error("Search error:", err);
            setSearchResult(null);
        }
    };

    const renderUserRow = (user: TCustomer) => (
        <tr key={user.customerID} className="hover:bg-gray-300 border-b border-gray-400">
            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.customerID}</td>
            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.firstName}</td>
            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.lastName}</td>
            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.email}</td>
            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.phoneNumber}</td>
            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.address}</td>
            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">{user.role}</td>
            <td className="px-4 py-2 border-r border-gray-400 lg:text-base">
                <span className={`badge ${user.isVerified ? "badge-success" : "badge-warning"}`}>
                    <span className={`lg:text-base ${user.isVerified ? "text-green-700" : "text-yellow-700"}`}>
                        {user.isVerified ? "Verified" : "Not Verified"}
                    </span>
                </span>
            </td>
            <td className="px-4 py-2">
                <button
                    className="btn btn-sm btn-primary text-blue-500 p-4"
                    onClick={() => {
                        setSelectedUser(user);
                        (document.getElementById("role_modal") as HTMLDialogElement)?.showModal();
                    }}
                >
                    Change Role
                </button>
            </td>
        </tr>
    );

    return (
        <div>
            <ChangeRole user={selectedUser} />

            {/* Search bar */}
            <div className="flex justify-center mb-4 mt-2 gap-2">
                <input
                    type="text"
                    value={searchID}
                    onChange={(e) => setSearchID(e.target.value)}
                    placeholder="Search by Customer ID"
                    className="input input-bordered input-sm text-black bg-white"
                />
                <button
                    className="btn btn-sm bg-white text-black"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {isLoading && <p>Loading users...</p>}
            {error && <p className="text-red-500">Error fetching users</p>}

            {!isLoading && (
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr className="bg-gray-600 text-white text-md lg:text-lg">
                                <th className="px-4 py-2">User ID</th>
                                <th className="px-4 py-2">First Name</th>
                                <th className="px-4 py-2">Last Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2">Address</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Verified</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResult
                                ? renderUserRow(searchResult)
                                : usersData?.map(renderUserRow)
                            }
                        </tbody>
                    </table>
                </div>
            )}

            {!searchResult && usersData?.length === 0 && (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default Users;

