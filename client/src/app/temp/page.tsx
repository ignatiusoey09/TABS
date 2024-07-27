'use client'

import Layout from "../components/layout";
import UpcomingBooking from "../components/profileComponents/upcoming_booking";

export default function Temp() {

    const Child = () => (
        <>
            <h2>TESTING 123</h2>
            
        </>
    );
    return (
        <Layout>
            <Child></Child>
        </Layout>
    );
}