import CarManager from '../../assets/images/services.jpeg';

const About = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8 bg-amber-200">
                <div className="w-full md:w-1/2 flex items-center">
                    <img
                        src={CarManager}
                        alt="car-booking-management"
                        className="w-full h-48 md:h-full object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="w-full md:w-1/2 border-2 border-gray-300 rounded-lg p-6 md:p-8 mb-6 md:mb-0">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600">
                        About CarBook
                    </h1>
                    <p className="mb-4 text-gray-700 text-base md:text-lg">
                        CarBook is an all-in-one car booking platform designed to streamline how customers book vehicles and how rental businesses manage their operations.
                    </p>
                    <p className="mb-2 text-gray-700 text-base md:text-lg">
                        Users can easily browse available cars, make quick reservations, and complete secure payments. Admins get a clear view of each car’s reservation history, maintenance schedule, insurance status, and current location.
                    </p>
                    <p className="text-gray-700 text-base md:text-lg">
                        With CarBook, renting out and managing cars is faster, smarter, and more organized—for both customers and service providers.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;
