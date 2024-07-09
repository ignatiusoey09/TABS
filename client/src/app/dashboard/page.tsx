'use client'

import Layout from '../components/layout';
import TimeslotButton from '../components/timeslot_button';
import BookingOverlay from '../components/booking_overlay';
import Calendar from 'react-calendar';
import { type View } from 'node_modules/react-calendar/dist/esm/shared/types';
import './Calendar.css';
import { useEffect, useState } from 'react';
import { useGetTimeslots } from '../hooks/useGetDateTimeslots';
import { MoonLoader } from 'react-spinners';
import { useAuthContext } from '../hooks/useAuthContext';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type T_timeslot = {
    time: string,
    is_booked: boolean
    user?: {
        email: string,
        name: string,
        role: string,
    }
}

interface IDisableDateArgs {
    activeStartDate: Date,
    date : Date,
    view: View
}

export interface IBookingData {
    date: Date,
    startTime: string,
    endTime: string
}

export default function Dashboard() {

    //setting up hooks
    const [calendarValue, setCalendarValue] = useState<Value>(new Date());
    const [timeslots, set_timeSlots] = useState<Array<T_timeslot>>([{time:"smthing", is_booked:false}]);
    const [modalOpen, setModalOpen] = useState(false);
    const [bookingData, setBookingData] = useState<IBookingData>({date: new Date(), startTime:"", endTime:""});
    const [update, setUpdate] = useState(false);
    const { getTimeslots, isLoading } = useGetTimeslots();
    const { state }  = useAuthContext();
    const user = state["user"];

    //handles querying database
    const handleQuery = async (date:Value) => {
        const data = await getTimeslots(date as Date);
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

    //handles booking confirmation overlay
    const handleModalOpen = () => {
        setUpdate(false);
        setModalOpen(true);
    }

    const handleModalClose = () => {
        setUpdate(true);
        setModalOpen(false);
    }

    //executes before initial page render, and everytime calendarValue changes
    useEffect(() => {
        const fetchData = async () => {
            await handleQuery(calendarValue);
        }

        fetchData().catch(console.error);
    }, [calendarValue, user, update]);


    const Child = () => (
        <>  
            {modalOpen && <BookingOverlay datetime={bookingData} callback={handleModalClose}/>}
            <div className='w-[80%] h-[80%] self-center lg:h-[60%]'>
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
            {!isLoading  && <div className='border-2 mt-6 pt-4 h-full grid grid-cols-2 grid-rows-4 grid-flow-col place-items-center'>
                {
                    timeslots.map((x, i) => <TimeslotButton key={i} timeslot={x} date={calendarValue as Date} handleModal={handleModalOpen} callback={setBookingData}/>)
                }
            </div>}

            <MoonLoader className="place-self-center mt-40" loading={isLoading} />
        </>
    );

    return (
        <Layout children={<Child />} />
    );
}