"use server";

import { cookies } from "next/headers";

export const setCookie = async (data : { refresh: string, access: string, user: object}) => {
    cookies().set('refresh', data.refresh, { path: '/' });
    cookies().set('access', data.access, { path: '/' });
    cookies().set('user', JSON.stringify(data.user), { path: '/' });
}