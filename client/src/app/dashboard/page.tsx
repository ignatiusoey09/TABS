'use client'

import Layout from '../components/layout';
import TimeslotButton from '../components/timeslot_button';
import Calendar from 'react-calendar';
import { type View } from 'node_modules/react-calendar/dist/esm/shared/types';
import './Calendar.css';
import { useEffect, useState } from 'react';
import { useGetTimeslots } from '../hooks/useGetDateTimeslots';
import { MoonLoader } from 'react-spinners';

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

    //setting up hooks
    const [calendarValue, setCalendarValue] = useState<Value>(new Date());
    const [timeslots, set_timeSlots] = useState<Array<T_timeslot>>([]); 
    const { getTimeslots, isLoading, setIsLoading } = useGetTimeslots();

    //handles querying database
    const handleQuery = async (date:Value) => {
        console.log("date " + date);
        const data = await getTimeslots(date as Date);
        console.log("data " + data);
        set_timeSlots(data);
    }

    //handles user selecting new calendar date
    const handleChange = async (date:Value) => {
        setCalendarValue(date);
    }

    //handles disabling calendar dates
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

    //executes before initial page render, and everytime calendarValue changes
    useEffect(() => {
        console.log("called");
        const fetchData = async () => {
            await handleQuery(calendarValue);
        }

        fetchData().catch(console.error);
    }, [calendarValue]);

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
            {!isLoading  && <div className='border-2 mt-6 grow grid grid-cols-2 grid-rows-4 grid-flow-col place-items-center'>
                {
                    timeslots.map((x, i) => <TimeslotButton key={i} timeslot={x} date={calendarValue as Date}/>)
                }
            </div>}

            <MoonLoader className="place-self-center mt-40" loading={isLoading} />
        </>
    );

    return (
        <Layout children={<Child />} />
    );
}