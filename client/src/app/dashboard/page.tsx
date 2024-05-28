'use client'

import Layout from '../components/layout';

export default function Dashboard() {
    const Child = () => (
        <h1 className='text-center mt-60 text-2xl'>TESTING 123</h1>
    );
    return (
        <Layout children={<Child />} />
    );
}