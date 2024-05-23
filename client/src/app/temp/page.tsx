'use client'

import Layout from "../components/layout";

export default function Temp() {
    const Child = () => (
        <>
            <h2>TESTING 123</h2>
            <h2>SAMPLE TEXT SAAMPLE TEXT</h2>
        </>
    );
    return (
        <>
            <Layout children={<Child />} />
        </>
    );
}