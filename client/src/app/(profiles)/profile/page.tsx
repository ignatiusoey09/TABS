'use client'

import { useEffect } from "react";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const { state } = useAuthContext();

    useEffect(() => {
        const role = state.user!.user.role;
        switch (role) {
            case "student":
                router.replace("/student");
                break;
            case "quartermaster":
                router.replace("/quartermaster");
                break;
        }
    },[])
    return (
        <>
        </>
    );
}