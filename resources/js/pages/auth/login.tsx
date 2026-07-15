import { useEffect, useRef, useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

function Eye({ small = false }: { small?: boolean }) {
    const size = small ? 14 : 22;
    const pupilSize = small ? 6 : 9;
    return (
        <div
            className="eye rounded-full bg-white flex items-center justify-center shadow-sm"
            style={{ width: size, height: size }}
        >
            <div
                className="pupil rounded-full bg-gray-900 transition-transform duration-150"
                style={{ width: pupilSize, height: pupilSize }}
            />
        </div>
    );
}

export default function Login({ status, canResetPassword }: Props) {
    const stageRef = useRef<HTMLDivElement>(null);
    const [averting, setAverting] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const stage = stageRef.current;
            if (!stage) return;

            const pupils = stage.querySelectorAll<HTMLDivElement>('.pupil');
            const chars = stage.querySelectorAll<HTMLDivElement>('.character');

            if (!averting) {
                stage.querySelectorAll<HTMLDivElement>('.eye').forEach((eye, i) => {
                    const r = eye.getBoundingClientRect();
                    const cx = r.left + r.width / 2;
                    const cy = r.top + r.height / 2;
                    const dx = e.clientX - cx;
                    const dy = e.clientY - cy;
                    const dist = Math.min(4, Math.hypot(dx, dy) / 20);
                    const angle = Math.atan2(dy, dx);
                    pupils[i].style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
                });
            }

            const sr = stage.getBoundingClientRect();
            const relX = (e.clientX - sr.left - sr.width / 2) / sr.width;
            chars.forEach((ch, i) => {
                const strength = (i + 1) * 1.5;
                ch.style.transform = `translateX(${relX * strength}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [averting]);

    useEffect(() => {
        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            if (target?.name === 'password') {
                setAverting(true);
                stageRef.current?.querySelectorAll<HTMLDivElement>('.pupil').forEach((p) => {
                    p.style.transform = 'translate(-4px, -3px)';
                });
            }
        };
        const handleFocusOut = (e: FocusEvent) => {
            const target = e.target as HTMLInputElement;
            if (target?.name === 'password') setAverting(false);
        };

        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);
        return () => {
            document.removeEventListener('focusin', handleFocusIn);
            document.removeEventListener('focusout', handleFocusOut);
        };
    }, []);

    return (
        <>
            <Head title="Log in" />

            {/* Wrapper luar: full screen, tempat menengahkan card */}
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">

                {/* Card: ukuran dibatasi, rounded, shadow */}
                <div className="flex w-full max-w-4xl h-[560px] rounded-2xl overflow-hidden shadow-xl bg-white">

                    {/* Panel kiri: karakter animasi */}
                    <div
                        ref={stageRef}
                        className="hidden md:flex flex-1 relative bg-gray-50 items-end justify-center overflow-hidden"
                    >
                        <div className="character absolute bottom-0 left-[20%] w-[110px] h-[200px] rounded-2xl bg-indigo-400 flex flex-col items-center pt-9">
                            <div className="flex gap-3">
                                <Eye />
                                <Eye />
                            </div>
                            <div className="w-3.5 h-2 rounded-b-full bg-indigo-800 mt-2.5" />
                        </div>

                        <div className="character absolute bottom-0 left-[42%] w-[68px] h-[165px] rounded-xl bg-gray-900 flex flex-col items-center pt-7">
                            <div className="flex gap-3">
                                <Eye />
                                <Eye />
                            </div>
                            <div className="w-3 h-1.5 rounded-b-full bg-white mt-2" />
                        </div>

                        <div className="character absolute bottom-0 left-[28%] w-[160px] h-[115px] rounded-t-full bg-orange-400 flex flex-col items-center pt-7">
                            <div className="flex gap-5">
                                <Eye />
                                <Eye />
                            </div>
                            <div className="w-4 h-2 rounded-b-full bg-orange-900 mt-2.5" />
                        </div>

                        <div className="character absolute bottom-0 left-[60%] w-[50px] h-[130px] rounded-t-lg bg-yellow-400 flex flex-col items-center pt-5">
                            <div className="flex gap-2">
                                <Eye small />
                                <Eye small />
                            </div>
                            <div className="w-2 h-1 rounded-b-full bg-yellow-900 mt-1.5" />
                        </div>
                    </div>

                    {/* Panel kanan: form login */}
                    <div className="w-full md:w-[380px] bg-white flex flex-col justify-center px-10 py-12">
                        <h1 className="text-2xl font-bold mb-1 text-gray-900">Welcome back</h1>
                        <p className="text-sm text-gray-500 mb-8">
                            Enter your email and password below to log in
                        </p>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email" className="text-gray-700">Email address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="bg-white border-gray-200 text-gray-900"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password" className="text-gray-700">Password</Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="ml-auto text-sm"
                                                        tabIndex={5}
                                                    >
                                                        Forgot your password?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Password"
                                                className="bg-white border-gray-200 text-gray-900"
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                            />
                                            <Label htmlFor="remember" className="text-gray-700">Remember me</Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-4 w-full"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing && <Spinner />}
                                            Log in
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>

                        {status && (
                            <div className="mt-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Login.layout = (page: React.ReactNode) => page;