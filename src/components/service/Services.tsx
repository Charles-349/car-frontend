import serviceIMG from '../../assets/images/services.jpg';

const serviceList = [
    {
        name: 'Car Booking',
        description: 'Reserve cars based on availability, schedule, and location.',
        status: 'Active',
    },
    {
        name: 'Payment Processing',
        description: 'Secure and trackable payments for every booking.',
        status: 'Active',
    },
    {
        name: 'Reservation Management',
        description: 'View upcoming and past reservations linked to each user or car.',
        status: 'Active',
    },
    {
        name: 'Car Maintenance Logs',
        description: 'Track car servicing and maintenance schedules.',
        status: 'Active',
    },
    {
        name: 'Insurance Tracking',
        description: 'Monitor car insurance validity and coverage details.',
        status: 'Active',
    },
    {
        name: 'Location Mapping',
        description: 'Assign and view the physical location of each car.',
        status: 'Active',
    },
    {
        name: 'Customer Profiles',
        description: 'Manage customer info, activity, and verification status.',
        status: 'Active',
    },
    {
        name: 'Admin Dashboard',
        description: 'Gain insights into bookings, payments, fleet status, and more.',
        status: 'Active',
    },
];

const Services = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-fit p-4 md:p-8 bg-blue-300">
           
            <div className="w-full md:w-1/2 flex items-center mb-6 md:mb-0">
                <img
                    src={serviceIMG}
                    alt="Our Services"
                    className="w-full h-48 md:h-full object-cover rounded-lg shadow-lg"
                />
            </div>

           
            <div className="w-full md:w-1/2 flex flex-col gap-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-600">
                    Our Services
                </h2>
                <p className="mb-4 text-gray-700 text-base md:text-lg">
                    Our car rental system provides a complete suite of services to make managing and booking vehicles effortless for both customers and administrators.
                </p>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Service</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceList.map((service, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{service.name}</td>
                                    <td>{service.description}</td>
                                    <td>{service.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

              {/* <button className="btn btn-primary self-start mt-4">Get Started</button>   */}
            </div>
        </div>
    );
};

export default Services;
