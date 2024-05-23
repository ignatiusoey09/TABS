'use client'

import Layout from '../components/layout';

export default function Dashboard() {
    const Child = () => (
        <h1>TESTING 123</h1>
    );
    return (
        <Layout children={<Child />} />
    );
}