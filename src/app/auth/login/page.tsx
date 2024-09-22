'use client';

import { useState } from 'react';
import { login } from './login.services';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '' };

        if (!email) {
            newErrors.email = 'El correo electrónico es requerido';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El correo electrónico no es válido';
            isValid = false;
        } else {
            newErrors.email = '';
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await login(email, password);
        }
    };

    return (
        <div className="p-10 lg:w-1/4 rounded shadow-md border border-gray-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <h2 className="text-center font-semibold text-2xl">Iniciar Sesión</h2>
                <Input
                    type="text"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateForm();
                    }}
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validateForm();
                    }}
                />
                <Button>Iniciar Sesión</Button>
                <span className="w-full h-[0.5px] bg-gray-400 rounded"></span>
                <p className="text-sm text-center">
                    ¿Aún no estás registrado?{' '}
                    <a href="/auth/signup" className="text-[#FF7A00] underline">
                        Regístrate aquí
                    </a>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
