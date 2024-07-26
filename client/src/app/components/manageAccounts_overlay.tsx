import React from "react";
import { useRouter } from "next/navigation";
import RegisterUserForm from "@/app/components/registerUser_overlay";
import ExportExcel from "./exportUserDetails";

interface IProps {
    callback: () => void,
    createAcc: () => void,
    data: any
}

export default function ManageAccountOptions({ callback, createAcc, data } : IProps) {
    const router = useRouter()

    const handler = () => {
        callback()
        createAcc()
    }

    return (
            <div> 
                <div className="flex flex-row fixed w-full max-w-2xl top-[30%] left-[50%] bg-white z-30 border rounded-lg ring-4 ring-teal-600 p-2">
                    <div className= "flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full p-16 mr-2 transition-colors">
                        <ExportExcel excelData={data} fileName={'Accounts_List'} callback={callback} />
                    </div>
                    <button className= "flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full p-20 ml-2 transition-colors" type="button" onClick={handler}>New Account</button>
                </div>
            <div className="fixed w-screen h-screen z-20 bg-gray-400/75" onClick={callback}></div>
            </div>
    );
}