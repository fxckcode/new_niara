"use client";

import { logoutAccess } from "@/app/actions";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { toast } from "sonner";

function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            if (await logoutAccess()) {
                toast.info('Sesión expirada')
                router.push('/auth/login')
            }
        }

        logout()
    }, [router])

    return (
        <div>
            <p className="text-2xl font-bold">Cerrando sesión</p>
        </div>
    )
}

export default Logout