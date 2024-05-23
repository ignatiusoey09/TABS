'use client'

import Bars from '../../../public/threebars.svg'
import Navbar from '../components/navbar';

export default function Dashboard() {
    return (
        <div className='h-screen bg-gray-200'>
            <div className='flex flex-row h-16 bg-white place-items-center'>
                <button>
                    <Bars className='basis-1/12 ml-1' />
                </button>
                <h2 className='basis-10/12 text-xl font-family-metrophobic text-title-gray text-center'>TABS</h2>
                <div className='basis-1/12'/>
            </div>
        </div>
    );
}