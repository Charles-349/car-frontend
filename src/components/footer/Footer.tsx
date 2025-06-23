
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-green-300 text-base-content p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Car Booking</a>
                    <a className="link link-hover">Insurance Tracking</a>
                    <a className="link link-hover">Reservation Management</a>
                    <a className="link link-hover">Payment Processing</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover" >About us</a>
                    <a className="link link-hover">Contacts</a>
                    <a className="link link-hover">Address</a>
                    <a className="link link-hover">Location</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Social Media</h6>
                    <div className="grid grid-flow-col gap-4">
                        <a>
                            <FaTwitter className="text-2xl cursor-pointer" />
                        </a>
                        <a>
                            <FaYoutube className="text-2xl cursor-pointer" />
                        </a>
                        <a>
                            <FaFacebook className="text-2xl cursor-pointer" />
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    )
}

export default Footer