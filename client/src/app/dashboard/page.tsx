'use client'

import Layout from '../components/layout';
import Calendar from 'react-calendar';
import './Calendar.css';

export default function Dashboard() {
    const Child = () => (
        <>
            <div className='w-[90%] h-[50%] self-center'>
                <Calendar calendarType='gregory' formatShortWeekday={(locale, date) => [ `S`, `M`, `T`, `W`, `T`, `F`, `S` ][date.getDay()]}/>
            </div>
            <div className='border-2 mt-6 grow'>
                <h1>time slots here</h1>
            </div>
        </>
    );

    return (
        <Layout children={<Child />} />
    );
}