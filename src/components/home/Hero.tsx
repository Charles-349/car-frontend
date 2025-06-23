import homeIMG from '../../assets/images/home-image.png'

export const Hero = () => {

    return (
        <div>
        <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8 bg-blue-100">
            <div className="w-full md:w-1/2 border-2 border-gray-300 rounded-lg p-6 md:p-8 mb-6 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-600">
                    Welcome to CarBook!
                </h1>
                <p className="mb-4 text-gray-700 text-base md:text-lg">
                    <span className="font-semibold text-blue-600">CarBook</span> is your go-to platform for managing car rentals with ease—whether you're a customer looking to book a car or an admin handling operations.
                </p>
                <p className="mb-2 text-gray-700 text-base md:text-lg">
                    Customers can explore available cars, make bookings, and pay securely. Admins can track reservations, manage car details, monitor maintenance, insurance, and locations—all in one place.
                </p>
                <p className="text-gray-700 text-base md:text-lg">
                    Start now and enjoy a smooth, efficient, and reliable car rental experience for everyone involved!
                </p>
            </div>

            <div className="w-full md:w-1/2 flex items-center">
                <img
                    src={homeIMG}
                    alt="home-image"
                    className="w-full h-48 md:h-full object-cover rounded-lg shadow-lg"
                />
            </div>
           
        </div >
         <button className="btn btn-primary mt-4 mx-auto block mb-4 bg-amber-300 rounded-2xl">Get Started</button>
        </div>
        
    );
}
export default Hero;