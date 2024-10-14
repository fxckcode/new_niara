"use server";

import { cookies } from "next/headers";

const configCookie = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60,
    sameSize: 'none' as const,
    path: '/'
}

const setCookie = (name: string, value: string) => {
    cookies().set(name, value, {
        ...configCookie
    })
}

export const setAuthCookies = async (data: { refresh: string, access: string, user: object }) => {
    setCookie('refresh', data.refresh)
    setCookie('access', data.access)
    setCookie('user', JSON.stringify(data.user))
}

export const getAccessToken = async () => {
    try {
        const cookieStore = cookies();
        return cookieStore.get('access')?.value || null;
    } catch (error) {
        console.error('Error al obtener el token de acceso');
        return null
    }
}

export const logoutAccess = async () => {
    try {
        cookies().delete('refresh')
        cookies().delete('access')
        cookies().delete('user')

        return true;
    } catch (error) {
        console.error('Error al cerrar sesión');
        return null;
    }
}