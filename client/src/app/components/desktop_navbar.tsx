import Link from "next/link";
import NavbarButton from "./navbar_button";

import ProfileIcon from 'public/profile_icon.svg';
import BookingIcon from 'public/booking_icon.svg';
import NewsIcon from 'public/news_icon.svg';
import ReportIcon from 'public/report_icon.svg';
import AboutIcon from 'public/about_icon.svg';

export default function Navbar_Desktop() {
    return (
        <>
            <div className= {`hidden flex flex-col h-screen w-2/6 bg-tembu-green z-50 lg:flex`}>
                <h2 className='basis-1/12 mt-4 text-center text-white text-2xl font-family-metrophobic'>TABS</h2>
                <div className='flex flex-col basis-7/12 justify-center'>
                    <Link href='/profile'>
                        <NavbarButton icon={ <ProfileIcon height={50} width={50} />} text='Profile'/>
                    </Link>
                    <Link href='/dashboard'>
                        <NavbarButton icon={ <BookingIcon height={50} width={50} />} text='Bookings'/>
                    </Link>
                    <Link href='/announcements'>
                        <NavbarButton icon={ <NewsIcon height={50} width={50} />} text='News'/>
                    </Link>
                    <Link href='/reportForm'>
                        <NavbarButton icon={ <ReportIcon height={50} width={50} />} text='Report'/>
                    </Link>
                </div>
                <div className='basis-3/12'/>
                <Link href="/temp">
                    <NavbarButton icon={ <AboutIcon height={50} width={50} />} text='About'/>
                </Link>
            </div>
        </>
    );
}