'use client'

import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

import ProfileIcon from 'public/profile_icon.svg';
import BookingIcon from 'public/booking_icon.svg';
import NewsIcon from 'public/news_icon.svg';
import ReportIcon from 'public/report_icon.svg';
import AboutIcon from 'public/about_icon.svg';


import NavbarButton from './navbar_button';

interface IProps {
    show: boolean,
    setter: Dispatch<SetStateAction<boolean>>
}

export default function Navbar({ show, setter } : IProps) {

    const appendClass = show ? "ml-0" : "-ml-[500px] lg:-ml-[1000px]";
    const transitionClass = "transition-[margin-left] ease-in-out duration-500";

    const ModalOverlay = () => (
        //spans the entire screen but is invisible
        <div 
            className= "flex fixed top-0 left-0 right-0 bottom-0 z-40"
            onClick={() => setter(false)}
        />
    );
    return (
        <>
            <div className= {`flex flex-col fixed h-screen w-4/6 ${transitionClass} ${appendClass} bg-tembu-green z-50 lg:hidden`}>
                <h2 className='basis-1/12 mt-4 text-center text-white text-2xl font-family-metrophobic'>TABS</h2>
                <div className='flex flex-col basis-7/12 justify-center'>
                    <Link href='/profile'>
                        <NavbarButton icon={ <ProfileIcon height={50} width={50} />} text='Profile'/>
                    </Link>
                    <Link href='/dashboard'>
                        <NavbarButton icon={ <BookingIcon height={50} width={50} />} text='Bookings'/>
                    </Link>
                    <NavbarButton icon={ <NewsIcon height={50} width={50} />} text='News'/>
                    <Link href='/reports'>
                        <NavbarButton icon={ <ReportIcon height={50} width={50} />} text='Report'/>
                    </Link>
                </div>
                <div className='basis-3/12'/>
                <NavbarButton icon={ <AboutIcon height={50} width={50} />} text='About'/>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}