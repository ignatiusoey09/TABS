'use client'

import Layout from "../components/layout";
import BookingOverlay from "../components/booking_overlay";
import { useState } from "react";

export default function Temp() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalClose = () => {
        setModalOpen(false);
    }

    const Child = () => (
        <>
            {modalOpen && <BookingOverlay datetime="datetime here" callback={handleModalClose}/>}
            <h2>TESTING 123</h2>
            <h2>SAMPLE TEXT SAAMPLE TEXT</h2>
        </>
    );
    return (
        <Layout>
            <Child></Child>
        </Layout>
    );
}