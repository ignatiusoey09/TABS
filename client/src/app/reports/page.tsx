'use client'

import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { FormEvent, useState } from "react";
import error from "next/error";



export default function Reports() {
    const router = useRouter();
    const { logout } = useLogout();
    const { state } = useAuthContext();

    //retrieve stored user in localstorage
    const retrieve = state.user;

    var user;
    if (retrieve) {
        user = retrieve.user;
    } else {
        user = {email:"", name: "", role:"",};
    }

    const handleClick = () => {
        logout();
        //send back to login page
        router.push("/");
    }

    // styling
    const error_input_style = error ? "border-2 border-red-400" : "border-1";
    const input_style = `h-8 w-[70%] lg:h-7 lg:w-full m-3`;
    const desc_input_style = `h-20 w-[70%] lg:h-7 lg:w-full m-3`;
 
    const form_style_lg = "lg:ml-14 lg:px-0 lg:mt-[8%] lg:items-start";
    const form_style_md = "md:mt-[45%] md:px-28";
    const form_style = `grow flex flex-col mt-[60%] items-center ${form_style_md} ${form_style_lg}`;
    //

    
    // variables to store input field data
    const [name, setName] = useState('')
    const [item, setItem] = useState('')
    const [description, setDesc] = useState('')
    


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(name,item,description)
        const report = {name, item, description}

        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backend_url}/api/report/submitReport`, {
            method: 'POST',
            body: JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
        }
        if(response.ok){
            setName('')
            setItem('')
            setDesc('')
            console.log("new report added", json)
        }

      }


    return (
        <Layout>
            
            <form className={form_style} onSubmit={ handleSubmit }>
                <h2 className="text-center align-text-top text-3xl m-1 text-title-gray">Submit a new report</h2>
                
                <input type="text" name="name" className={input_style} placeholder="Name:" onChange={(e) => setName(e.target.value)} value={name} required/>

                <input type="text" name="itemDamaged" className={input_style} placeholder="Item:" onChange={(e) => setItem(e.target.value)} value={item} required/>

                <input type="text" name="description" className={desc_input_style} placeholder="Description:" onChange={(e) => setDesc(e.target.value)} value={description} required/>

                <button className= "bg-tembu-lightgreen rounded text-white mt-10 w-[30%] lg:w-full" type="submit">Submit</button>
            </form>
        </Layout>
    );
}