
import { FaUserCheck } from "react-icons/fa6";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { TbBrandBooking } from "react-icons/tb";
import { MdPayments } from "react-icons/md";
import { AiFillInsurance } from "react-icons/ai";
import { GrHostMaintenance } from "react-icons/gr";
import { RiReservedFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";

export type DrawerData = {
    id:string;
    name:string;
    icon:React.ComponentType<{size?: number}>;
    link:string
} 
export const userDrawerData: DrawerData[] = [
     {
        id: 'bookings',
        name: 'Bookings',
        icon: TbBrandBooking,
        link: 'bookings'
    },
     {
        id: 'payments',
        name: 'Payments',
        icon: MdPayments ,
        link: 'payments'
    },
     {
        id: 'insurances',
        name: 'Insurances',
        icon: AiFillInsurance,
        link: 'insurances'
    },
     {
        id: 'maintenances',
        name: 'Maintenances',
        icon: GrHostMaintenance,
        link: 'maintenances'
    },
     {
        id: 'reservations',
        name: 'Reservations',
        icon:  RiReservedFill,
        link: 'reservations'
    },
     {
        id: 'locations',
        name: 'Locations',
        icon:  FaLocationDot,
        link: 'locations'
    },
    
    {
        id: 'profile',
        name: 'Profile',
        icon: FaUserCheck ,
        link: 'profile'
    },
    {
        id: 'analytics',
        name: 'Analytics',
        icon: TbBrandGoogleAnalytics ,
        link: 'analytics'
    },
]