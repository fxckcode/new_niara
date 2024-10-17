"use client";

import { useState } from 'react';
import { login } from './login.services';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import ErrorMessage from '@/components/error-message';
import { logoutAccess, setAuthCookies } from '@/app/actions';

function LoginPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().min(1, { message: 'El correo electrónico es requerido' }).email({ message: 'El correo electrónico no es válido' }),
        password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const data = {
                email: values.email,
                password: values.password
            }

            const response = await login(data);

            if (response.status === 200) {
                if (await logoutAccess()) {
                    await setAuthCookies(response.data);
                }
                router.push('/dashboard');
                toast.success('Inicio de sesión exitoso');
            }

        } catch (error: any) {
            setErrorMessage('Credenciales incorrectas. Verifica tu usuario y contraseña.');
            toast.error('Credenciales incorrectas. Verifica tu usuario y contraseña.');
        }
    }

    return (
        <div className="p-10 lg:w-1/4 rounded shadow-md border border-gray-300">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-3'>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo</FormLabel>
                                <FormControl>
                                    <Input placeholder='Email' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='Contraseña' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {errorMessage && (
                        <ErrorMessage message={errorMessage} />
                    )}

                    <Button type='submit' className='w-full'>Iniciar Sesión</Button>

                    <hr />

                    <p>¿Aún no te haz registrado? <a onClick={() => router.push('/auth/signup')} className='cursor-pointer'>Registrar aquí</a></p>

                </form>
            </Form>
        </div>
    );
}

export default LoginPage;
