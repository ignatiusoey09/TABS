'use client'

import Layout from "../components/layout";
import UpcomingBooking from "../components/upcoming_booking";

export default function Temp() {

    const Child = () => (
        <>
            <h2>TESTING 123</h2>
            <UpcomingBooking date="Wed Jul 10 2024" time="8:00 AM" booking_id="asdf"/>
        </>
    );
    return (
        <Layout>
            <Child></Child>
        </Layout>
    );
}