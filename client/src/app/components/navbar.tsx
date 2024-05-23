import ProfileIcon from 'public/profile_icon.svg';
import BookingIcon from 'public/booking_icon.svg';
import NewsIcon from 'public/news_icon.svg';
import ReportIcon from 'public/report_icon.svg';
import AboutIcon from 'public/about_icon.svg';

import NavbarButton from './navbar_button';


export default function Navbar() {
    const ModalOverlay = () => (
        <div 
            className='flex fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30'
        />
    );
    return (
        <>
            <div className='flex flex-col fixed h-screen w-4/6 p-2 bg-tembu-green z-40'>
                <h2 className='basis-1/12 mt-4 text-center text-white text-2xl font-family-metrophobic'>TABS</h2>
                <div className='flex flex-col basis-7/12 justify-center'>
                    <NavbarButton icon={ <ProfileIcon height={50} width={50} />} text='Profile'/>
                    <NavbarButton icon={ <BookingIcon height={50} width={50} />} text='Bookings'/>
                    <NavbarButton icon={ <NewsIcon height={50} width={50} />} text='News'/>
                    <NavbarButton icon={ <ReportIcon height={50} width={50} />} text='Report'/>
                </div>
                <div className='basis-3/12'/>
                <NavbarButton icon={ <AboutIcon height={50} width={50} />} text='About'/>
            </div>
            <ModalOverlay />
        </>
    )
}