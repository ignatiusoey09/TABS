'use client'

import Layout from '../components/layout';
import Calendar from 'react-calendar';
import './Calendar.css';
import { useState } from 'react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Dashboard() {

    const [calendarValue, onChange_calendarValue] = useState<Value>(new Date());

    const Child = () => (
        <>
            <div className='w-[90%] h-[50%] self-center'>
                <Calendar 
                    calendarType='gregory' 
                    formatShortWeekday={(locale, date) => [ `S`, `M`, `T`, `W`, `T`, `F`, `S` ][date.getDay()]}
                    value={calendarValue}
                    onChange={onChange_calendarValue}
                    next2Label={null}
                    prev2Label={null}
                />
            </div>
            <div className='border-2 mt-6 grow'>
                <h1>time slots here</h1>
            </div>
        </>
    );

    console.log(calendarValue);

    return (
        <Layout children={<Child />} />
    );
}