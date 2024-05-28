'use client'

import Layout from '../components/layout';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Dashboard() {
    const Child = () => (
        <div>
            <Calendar />
        </div>
    );

    return (
        <Layout children={<Child />} />
    );
}