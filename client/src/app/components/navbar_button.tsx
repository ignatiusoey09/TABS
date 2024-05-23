import { ReactElement } from "react";

export default function NavbarButton({ icon, text }: { icon:ReactElement, text:string}) {
    return (
        <div className='flex flex-row items-center px-2 py-4 space-x-6'>
                { icon }
                <h2 className='text-white text-lg'>{text}</h2>
        </div>
    );
}