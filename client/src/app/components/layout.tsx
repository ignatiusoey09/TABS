'use client'

import { ReactElement, useState } from "react";
import Navbar from "./navbar";
import Bars from "public/threebars.svg";

interface IProps {
    children: ReactElement
}

export default function Layout({children} : IProps ) {
    const [showNavbar, setShowNavbar] = useState<boolean>(false);

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar show={showNavbar} setter={setShowNavbar} />

            <div className='flex flex-row h-16 bg-white place-items-center z-10 drop-shadow'>
                <button className='basis-1/12 ml-1' onClick={() => setShowNavbar(true)}>
                    <Bars height = {30} width = {30}/>
                </button>
                <h2 className='basis-10/12 text-xl font-family-metrophobic text-title-gray text-center'>TABS</h2>
                <div className='basis-1/12'/>
            </div>
            
            <div className='flex flex-col w-screen grow'>
                {children}
            </div>
            
        </div>
    );
}