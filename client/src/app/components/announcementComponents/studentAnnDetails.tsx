import React, { useState } from 'react'; // Import React

interface Announcement {
    _id?: string,
    name: string,
    role: string,
    title: string,
    message: string,
    createdAt?: string
    updatedAt?: string
}

interface AnnouncementDetailsProps {
    announcement: Announcement
}


const AnnouncementDetails: React.FC<AnnouncementDetailsProps> = ({ announcement }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function getMessagePreview(msg:string) {
        const max_len = 100;
        if (msg.length >=max_len) {
            return msg.slice(0, max_len) + "...";
        } 
        return msg;
    }

    const id = announcement._id ? announcement._id : '';
    const date = announcement.createdAt ? announcement.createdAt : '';
    const short_date = new Date(date).toLocaleDateString('en-US', {
        month: "short",
        day: "numeric",
    })

    const msg_preview = getMessagePreview(announcement.message);
    const announcer = announcement.name + " - " + announcement.role;

    const handleAnnModal = () => {
        setIsModalOpen(true);
    }

    return (
        <>
        {isModalOpen && 
            <>
                <div className='absolute top-0 left-0 bg-gray-500/50 h-screen w-screen z-40' onClick={()=>setIsModalOpen(false)}/>
                <div className='absolute top-[20%] left-[40%] flex flex-col bg-white rounded h-80 w-96 z-50 p-4 overflow-y-auto'>
                    <h1 className='font-semibold text-xl'>{announcement.title}</h1>
                    <p className='mt-6 text-sm'>{announcement.message}</p>
                    <div className='mt-auto pt-2 flex flex-row'>
                        <p className='text-gray-500 text-left text-xs'>{short_date}</p>
                        <p className='text-gray-500 grow text-right text-xs'>{announcer}</p>
                    </div>
                </div>
            </>
        }
        <div className="flex flex-col items-start py-3 px-2 transition duration-300 ease-in-out hover:bg-gray-200 hover:cursor-pointer" onClick={handleAnnModal}>
            <div className="flex-grow flex flex-col justify-between">
                    <h4 className="text-lg font-semibold">{announcement.title}</h4>
                    <p className="text-gray-600 text-sm">{msg_preview}</p>
            </div>
            <div className='flex flex-row w-full mt-4'>
                <p className="mr-auto text-xs text-gray-500">
                    {short_date}
                </p>
                <p className="ml-auto text-xs text-gray-500">{announcer}</p>
            </div>
        </div>
        </>
    )

}

export default AnnouncementDetails