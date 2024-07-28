const Booking = require("../models/bookingModel");
const nodemailer = require("nodemailer");

async function notifyUsersBookingTmr() {
    const transport = nodemailer.createTransport({
        pool: false,
        host: 'smtp-mail.outlook.com',
        port: 587, //port for secure smtp
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    function sendEmail(receiverEmail, timeslot) {
        let message = {
            from: '"Tembusu Abbey Booking System" <tabstembusu@outlook.com>',
            to: `${receiverEmail}`,
            subject: 'Upcoming Booking',
            text: `Reminder that you have an Abbey booking tommorow @ ${timeslot}`,
            html: `<p>Hi! Reminder that you have an Abbey booking tommorow @ <b>${timeslot}</b></p>`
        }
    
        transport.sendMail(message, (error, info) => {
            if (error) {
                console.log("Error sending email");
                console.log(error.message);
            }
    
            console.log("Email sent successfully");
        });
    
    }

    const today = new Date();
    const tmr = new Date();
    tmr.setDate(today.getDate() + 1);

    //find booked timeslots tommorow
    const bookings_tmr = await Booking.findOne({date:tmr.toDateString()});
    const slots_tmr = bookings_tmr.slots;

    let promise = new Promise(() => {
        for (let i=0; i<slots_tmr.length; i++) {
            let s = slots_tmr[i];
            if (s.is_booked) {
                let user_email = s.user.email;
                let timeslot = tmr.toDateString() + ' ' + s.time;
                setTimeout(() => sendEmail(user_email, timeslot), 1000);
            }
        }
    });
    promise.then(() => transport.close());
}

module.exports = notifyUsersBookingTmr;