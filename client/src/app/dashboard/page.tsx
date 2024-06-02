'use client'

import Layout from '../components/layout';
import TimeslotButton from '../components/timeslot_button';
import Calendar from 'react-calendar';
import { type View } from 'node_modules/react-calendar/dist/esm/shared/types';
import './Calendar.css';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type T_timeslot = {
    time: string,
    is_booked: boolean
}

interface IDisableDateArgs {
    activeStartDate: Date,
    date : Date,
    view: View
}

export default function Dashboard() {

    //state is a json with 'user' json field
    const { state } = useAuthContext();
    const user = state.user;

    const [calendarValue, onChange_calendarValue] = useState<Value>(new Date());
    const [timeslots, set_timeSlots] = useState<Array<T_timeslot>>([]); 

    console.log(new Date());

    const handleQuery = async (date:Value) => {
        const query_date = (date as Date).toDateString();
        if (user) {
            try {
                const response = await fetch("http://localhost:8080/api/booking/get_date_timeslots", {
                    //adding jwt token for api request auth
                    headers: {
                        'Content-Type': 'application/JSON',
                        'Authorization': `Bearer ${user.token}`
                    },
                    method: "POST",
                    body: JSON.stringify({date: query_date})
                });

                const response_data = await response.json();
                set_timeSlots(response_data["timeslots"]);

            } catch {
                console.log("error contacting server");
            }
        }
    }

    const handleChange = async (date:Value) => {
        onChange_calendarValue(date);
        handleQuery(date);
    }

    const disableDates = ({date} : IDisableDateArgs ) => {
        //only enable bookings from today till the end of next month
        var d = new Date();
        d.setDate(1);
        const nextMonth = new Date(d.getFullYear(), d.getMonth() + 2, d.getDate());

        if (date < nextMonth) {
            return false;
        }
        return true;
    }

    //handles querying before initial render, using today's date
    useEffect(() => {
        const fetchData = async () => {
            await handleQuery(calendarValue);
        }

        fetchData().catch(console.error);
    }, []);

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
                    minDate={new Date()}
                    tileDisabled={disableDates}
                />
            </div>
            <div className='border-2 mt-6 grow grid grid-cols-2 grid-rows-4 grid-flow-col place-items-center'>
                {
                    timeslots.map((x, i) => <TimeslotButton key={i} timeslot={x} date={calendarValue as Date}/>)
                }
            </div>
        </>
    );

    return (
        <Layout children={<Child />} />
    );
}