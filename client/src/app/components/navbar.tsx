import ProfileIcon from 'public/profile_icon.svg';
import BookingIcon from 'public/booking_icon.svg';
import NewsIcon from 'public/news_icon.svg';
import ReportIcon from 'public/report_icon.svg';
import AboutIcon from 'public/about_icon.svg';


export default function Navbar() {
    return (
        <div className='flex flex-col h-screen w-2/6 bg-tembu-green'>
            <h2 className='text-white font-family-metrophobic'>TABS</h2>
            <div className='flex flex-col'>
                <ProfileIcon className='fill-white' width={30} height={30}/>
                <BookingIcon className='fill-white' width={30} height={30}/>
                <NewsIcon className='fill-white' width={30} height={30}/>
                <ReportIcon className='fill-white' width={30} height={30}/>
                <AboutIcon className='fill-white' width={30} height={30}/>
            </div>
        </div>
    )
}