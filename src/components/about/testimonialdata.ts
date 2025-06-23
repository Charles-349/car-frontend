import story1 from '../../assets/images/story1.webp';
import story2 from '../../assets/images/story2.webp';

type Testimonial = {
    id: number;
    name: string;
    role: string;
    image: string;
    content: string;
};

export const testimonialsData: Testimonial[] = [
    {
        id: 1,
        name: 'Kevin Mwangi',
        role: 'Customer',
        image: story1,
        content: 'Booking a car has never been this easy. CarBook let me reserve and pay within minutes, and everything was smooth from start to finish.',
    },
    {
        id: 2,
        name: 'Mercy Wanjiru',
        role: 'Booking Agent',
        image: story2,
        content: 'Managing daily bookings is seamless with CarBook. I can track reservations, update availability, and assist customers effortlessly.',
    },
    {
        id: 3,
        name: 'James Otieno',
        role: 'Maintenance Supervisor',
        image: story1,
        content: 'I love how I can log service history and schedule maintenance without paperwork. CarBook keeps every car in top condition.',
    },
    {
        id: 4,
        name: 'Fatuma Noor',
        role: 'Insurance Coordinator',
        image: story2,
        content: 'CarBook’s insurance tracking is a lifesaver. It notifies us when coverage is due and helps avoid any compliance issues.',
    },
    {
        id: 5,
        name: 'Brian Kamau',
        role: 'Admin',
        image: story1,
        content: 'As an admin, I get full control over cars, users, and analytics. CarBook has made managing our rental operations so much more efficient.',
    },
    {
        id: 6,
        name: 'Linda Achieng',
        role: 'Customer',
        image: story2,
        content: 'I loved the transparency—CarBook showed me the car’s condition, insurance, and pickup location before I confirmed my booking.',
    },
    {
        id: 7,
        name: 'Samuel Kariuki',
        role: 'Fleet Location Analyst',
        image: story1,
        content: 'Tracking the real-time location of vehicles is straightforward. CarBook helps ensure cars are in the right place at the right time.',
    },
    {
        id: 8,
        name: 'Ann Chebet',
        role: 'Payment Officer',
        image: story2,
        content: 'The system tracks all payment records clearly. It’s easy to handle disputes or follow up on pending transactions.',
    },
];
