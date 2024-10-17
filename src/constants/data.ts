import { NavItem } from '@/types';

export type Product = {
    photo_url: string;
    name: string;
    description: string;
    created_at: string;
    price: number;
    id: number;
    category: string;
    updated_at: string;
};

export type Income = {
    id: number
    valor: number;
    descripcion: string;
    categoria: number;
    usuario: number
}

export type Category = {
    id: number;
    nombre: string;
    usuario: number
}

export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        label: 'Dashboard'
    },
    {
        title: 'Ingresos',
        href: '/dashboard/ingresos',
        icon: 'dollar',
        label: 'Ingresos'
    },
    {
        title: 'Login',
        href: '/auth/logout',
        icon: 'login',
        label: 'login'
    }
];
