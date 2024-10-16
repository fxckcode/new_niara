"use client";

import { useEffect, useState } from 'react';
import { fetchCountries, fetchTimezone, signUp } from '@/app/auth/signup/signUp.services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import z from 'zod';
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
import { logoutAccess, setAuthCookies } from '@/app/actions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

interface Country {
    name: string;
    callingCode: string;
}

function SignUpPage() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [openCountry, setOpenCountry] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [openTimezone, setOpenTimezone] = useState<boolean>(false);
    const [timezones, setTimezones] = useState<string[]>([]);
    const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadData = async () => {
            try {
                const [countriesData, timezoneData] = await Promise.all([
                    fetchCountries(),
                    fetchTimezone(),
                ]);
                setCountries(countriesData);
                setTimezones(timezoneData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        loadData();
    }, [])

    const formSchema = z.object({
        nombres: z.string().min(1, { message: 'El nombre es requerido' }),
        apellidos: z.string().min(1, { message: 'El apellido es requerido' }),
        zona_horaria: z.string().min(1, { message: 'La zona horaria es requerida' }),
        indicativo: z.string().min(1, { message: 'El indicativo es requerido' }),
        celular: z.string().min(1, { message: 'El número de celular es requerido' }),
        email: z.string().min(1, { message: 'El correo electrónico es requerido' }).email({ message: 'El correo electrónico no es válido' }),
        password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }).regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, { message: 'La contraseña debe contener al menos una letra, un número y un carácter especial' })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            nombres: '',
            apellidos: '',
            zona_horaria: '',
            indicativo: '',
            celular: '',
            email: '',
            password: ''
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const data = {
                nombres: values.nombres,
                apellidos: values.apellidos,
                zona_horaria: values.zona_horaria,
                indicativo: values.indicativo,
                celular: values.celular,
                email: values.email,
                password: values.password
            }

            const response = await signUp(data);

            if (response.status == 201) {
                toast.success('Usuario registrado exitosamente');
                router.push('/dashboard');
                if (await logoutAccess()) {
                    await setAuthCookies(response.data);
                }
            }
        } catch (error) {
            setErrorMessage('Error al registrar el usuario. Verifica los datos ingresados.');
            toast.error('Error al registrar el usuario. Verifica los datos ingresados.');
        }
    }


    return (
        <div className='p-10  rounded shadow-md border border-gray-300'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-3'>
                    <FormField
                        control={form.control}
                        name="nombres"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombres</FormLabel>
                                <FormControl>
                                    <Input placeholder='Nombres' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="apellidos"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellidos</FormLabel>
                                <FormControl>
                                    <Input placeholder='Apellidos' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zona_horaria"
                        render={({ field }) => (
                            <FormItem className='w-full flex flex-col gap-2'>
                                <FormLabel>Zona Horaria</FormLabel>
                                {/* <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setSelectedTimezone(value)
                                    }}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar zana horaría" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                timezones.map((t, index) => (
                                                    <SelectItem value={t} key={index}>{t}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select> */}
                                <Popover open={openTimezone} onOpenChange={setOpenTimezone}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openTimezone}
                                            className="justify-between"
                                        >
                                            {selectedTimezone
                                                ? timezones.find((c) => c === selectedTimezone)
                                                : "Seleccionar zona horaría..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Command>
                                            <CommandInput placeholder='Buscar zona horaría' />
                                            <CommandList>
                                                <CommandEmpty>No se encontró la zona horaría</CommandEmpty>
                                                <CommandGroup>
                                                    {
                                                        timezones.map((t, index) => (
                                                            <CommandItem
                                                                key={index}
                                                                value={t}
                                                                onSelect={(value) => {
                                                                    field.onChange(value);
                                                                    setSelectedTimezone(value);
                                                                    setOpenTimezone(false);
                                                                }}
                                                            >
                                                                {t}
                                                            </CommandItem>
                                                        ))
                                                    }
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row w-full items-center gap-2">
                        <FormField
                            control={form.control}
                            name="indicativo"
                            render={({ field }) => (
                                <FormItem className='w-1/3'>
                                    <FormLabel>Indicativo</FormLabel>
                                    {/* <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            setSelectedCountry(value)
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar indicativo" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    countries.map((c, index) => (
                                                        <SelectItem value={c.callingCode} key={index}>{c.callingCode} {c.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select> */}
                                    <Popover open={openCountry} onOpenChange={setOpenCountry}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={openCountry}
                                                className="w-[150px] justify-between"
                                            >
                                                {selectedCountry
                                                    ? countries.find((c) => c.callingCode === selectedCountry)?.callingCode
                                                    : "Seleccionar..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Command>
                                                <CommandInput placeholder='Buscar indicativo' />
                                                <CommandList>
                                                    <CommandEmpty>No se encontró el indicativo...</CommandEmpty>
                                                    <CommandGroup>
                                                        {
                                                            countries.map((c, index) => (
                                                                <CommandItem
                                                                    key={index}
                                                                    value={c.callingCode}
                                                                    onSelect={(value) => {
                                                                        field.onChange(value);
                                                                        setSelectedCountry(value);
                                                                        setOpenCountry(false);
                                                                    }}
                                                                >
                                                                    {c.callingCode} {c.name}
                                                                </CommandItem>
                                                            ))
                                                        }
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="celular"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Celular</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Celular' type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
                        <p>{errorMessage}</p>
                    )}

                    <Button type='submit' className='w-full'>Registrarse</Button>

                    <hr />

                    <p>¿Ya tienes una cuenta? <a onClick={() => router.push('/auth/login')} className='cursor-pointer'>Da click aquí</a></p>

                </form>
            </Form>
        </div>
    );
}

export default SignUpPage;