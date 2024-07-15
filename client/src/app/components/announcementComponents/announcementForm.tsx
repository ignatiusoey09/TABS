import React, { FormEvent, useState } from "react";
import error from "next/error";
import { useAnnouncementContext } from "../../hooks/useAnnouncementContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AnnouncementFormProps {
    name: string,
    role: string,
    token?: string,
}




const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ name, role, token}) => {

    const { dispatch } = useAnnouncementContext()
    // variables to store input field data
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')


    // New Announcement button style
    const unClicked = "bg-tembu-lightgreen rounded text-white mt-10 lg:w-full"
    const clicked = "bg-tembu-green rounded text-white mt-10 lg:w-full"
    const [uploadButtonStyle, setUploadButtonStyle] = useState(unClicked)


    // check if clicked or unclicked to determine whether to show the form or not
    const [isOpen, setIsOpen] = useState(false)

    const displayForm = () => {
        setIsOpen(!isOpen)
        if(isOpen){
            setUploadButtonStyle(unClicked)
        }
        else{
            setUploadButtonStyle(clicked)
        }
    }

    
    // styling
    const error_input_style = error ? "border-2 border-red-400" : "border-1";
    const input_style = "w-full mt-4 p-2.5 border rounded-lg focus:ring focus:ring-tembu-lightgreen focus:ring-opacity-50";
    const desc_input_style = input_style + " h-28";

    const uploadButtonVisibility = role !== 'student' ? "flex justify-center" : "hidden"; // show new announcement button if role is not user

    let form_style;
    if(isOpen){
        form_style = "w-full max-w-md space-y-6 border rounded-lg ring-4 ring-emerald-300 px-5 py-5 visible";
    }
    else{
        form_style = "w-full max-w-md space-y-6 border rounded-lg ring-4 ring-emerald-300 px-5 py-5 invisible";
    }
    //

    
    // handling submission
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!title || !message){
            toast.warn('Fill in ALL input fields', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return
        }
        const  announcement = {name, role, title, message}
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
       
        const response = await fetch(`${backend_url}/api/announcement/createAnnouncement`, {
            method: 'POST',
            body: JSON.stringify(announcement),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        const json = await response.json()
        if(!response.ok){
            console.log(json.error)
            toast.error('Sorry! There was an issue while uploading 😭', {  // popup notification
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        if(response.ok){
            setTitle('')
            setMessage('')
            console.log('New annoucnement uploaded', json)
            setIsOpen(!isOpen)
            dispatch({type: 'UPLOAD_ANNOUNCEMENT', payload: json})
            toast.success('Announcement uploaded 🥳', {  // popup notification
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }



    
        return (
            <div className="flex flex-col items-center px-4 py-8">
                <div className={uploadButtonVisibility}>
                    <button className={uploadButtonStyle} onClick={displayForm}>
                        New Announcement
                    </button>
                </div>

                <div className="py-5">
                    <form className={form_style} onSubmit={ handleSubmit }>
                        <h1 className="text-center align-text-top text-3xl font-semi m-1 text-title-green mb-6">Create new Announcement</h1>

                        <input type="text" name="title" className={input_style} placeholder="Title:" onChange={(e) => setTitle(e.target.value)} value={title}/>

                        <input type="text" name="message" className={desc_input_style} placeholder="Message:" onChange={(e) => setMessage(e.target.value)} value={message}/>

                        <button className= "flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full transition-colors" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )



}

export default AnnouncementForm