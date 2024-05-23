import { ReactElement } from "react";

export default function NavbarButton({ icon, text }: { icon:ReactElement, text:string}) {
    return (
        <div className='flex flex-row items-center pl-4 py-4 space-x-6 hover:bg-tembu-lightgreen'>
                { icon }
                <h2 className='text-white text-lg'>{text}</h2>
        </div>
    );
}