import ProfileIcon from 'public/profile_icon.svg';
import BookingIcon from 'public/booking_icon.svg';
import NewsIcon from 'public/news_icon.svg';
import ReportIcon from 'public/report_icon.svg';
import AboutIcon from 'public/about_icon.svg';


export default function Navbar() {
    return (
        <div className='flex flex-col bg-tembu-green'>
            <h2>TABS</h2>
            <ProfileIcon />
            <BookingIcon />
            <NewsIcon />
            <ReportIcon />
            <AboutIcon />
        </div>
    )
}