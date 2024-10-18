"use server";

import { cookies } from "next/headers";

const configCookie = {
    secure: true,
    maxAge: 24 * 60 * 60,
    sameSize: 'lax'
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
        setCookie('refresh', "")
        setCookie('access', "")
        setCookie('user', "")

        return true;
    } catch (error) {
        console.error('Error al cerrar sesión');
        return null;
    }
}

export const getUser = async () => {
    try {
        const cookieStore = cookies();
        const userCookie = cookieStore.get('user')?.value;
        
        return userCookie ? JSON.parse(userCookie) : null;
    } catch (error) {
        console.error('Error al obtener el usuario');
        return null;
    }
}