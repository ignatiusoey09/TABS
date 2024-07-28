import React from 'react'; // Import React

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

    const id = announcement._id ? announcement._id : ''
    const date = announcement.createdAt ? announcement.createdAt : ''

    return (
        <div className="flex flex-col items-start py-3 transition duration-300 ease-in-out hover:bg-gray-200">
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h4 className="text-lg font-semibold">{announcement.title}</h4>
                    <p className="text-gray-600 text-sm">{announcement.message}</p>
                </div>
            </div>
            <div className='flex flex-row w-full mt-4'>
                <p className="mr-auto text-xs text-gray-500">
                    {new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })}
                </p>
                <p className="ml-auto text-xs text-gray-500">{announcement.name} - {announcement.role}</p>
            </div>
        </div>
    )

}

export default AnnouncementDetails