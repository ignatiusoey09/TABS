'use client'

import Layout from '../components/layout';
import Calendar from 'react-calendar';
import './Calendar.css';
import { useState } from 'react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Dashboard() {

    const [calendarValue, onChange_calendarValue] = useState<Value>(new Date());
    const [timeslots, set_timeSlots] = useState<Array<JSON>>([]); 

    const handleQuery = async (date:Value) => {
        const query_date = (date as Date).toDateString();
        try {
            const response = await fetch("http://localhost:8080/api/book", {
                headers: {'Content-Type': 'application/JSON'},
                method: "POST",
                body: JSON.stringify({date: query_date})
            });

            const response_data = await response.json();
            set_timeSlots(response_data["timeslots"]);

            console.log(timeslots);
        } catch {
            console.log("error contacting server");
        }
    }

    const handleChange = async (date:Value) => {
        onChange_calendarValue(date);
        handleQuery(date);
    }

    const Child = () => (
        <>
            <div className='w-[90%] h-[50%] self-center'>
                <Calendar 
                    calendarType='gregory' 
                    formatShortWeekday={(locale, date) => [ `S`, `M`, `T`, `W`, `T`, `F`, `S` ][date.getDay()]}
                    value={calendarValue}
                    onChange={handleChange}
                    next2Label={null}
                    prev2Label={null}
                />
            </div>
            <div className='border-2 mt-6 grow'>
                <h1>time slots here</h1>
                {timeslots.map((x, i) => <h2>{JSON.stringify(x)}</h2>)}
            </div>
        </>
    );

    

    return (
        <Layout children={<Child />} />
    );
}