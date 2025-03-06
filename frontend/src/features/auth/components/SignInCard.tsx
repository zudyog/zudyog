"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { redirect, usePathname } from 'next/navigation'
import { useRegisterMutation } from '../api';
import { LoginRequest, RegisterRequest } from '../types';
import { useAppDispatch } from '@/store/hooks';
import { signIn } from "next-auth/react";


const Card = styled(MuiCard)(({ theme }: { theme: any }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export default function SignInCard() {
    const dispatch = useAppDispatch();

    const pathname = usePathname()
    // check path name contains signup
    const isSignup = pathname.includes('signup')
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [register, { isLoading, error, data }] = useRegisterMutation();

    React.useEffect(() => {
        if (data) redirect('/')
    }, [isLoading, data, error, dispatch]);


    const handleLogin = async (data: FormData) => {
        const credentials = {
            username: data.get('email'),
            password: data.get('password'),
        } as LoginRequest

        const res = await signIn("credentials", {
            ...credentials,
            redirect: false,
        });

        if (res?.error) {
            alert("Login failed");
        } else {
            redirect('/dashboard');
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (emailError || passwordError || nameError) {
            event.preventDefault();
            return;
        }
        const data = new FormData(event.currentTarget);

        if (!isSignup) {
            handleLogin(data)
            return;
        }

        const body = {
            email: data.get('email'),
            password: data.get('password'),
            fullname: data.get('name'),

        } as RegisterRequest

        register(body)

    };

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const name = document.getElementById('name') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if ((!name?.value || name?.value.length < 1) && isSignup) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        return isValid;
    };

    return (
        <Card variant="outlined">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
                {isSignup ? 'Sign up' : 'Sign in'}
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
                {isSignup && (
                    <FormControl>
                        <FormLabel htmlFor="name">Full name</FormLabel>
                        <TextField
                            autoComplete="name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            placeholder="Steve Jobs"
                            error={nameError}
                            helperText={nameErrorMessage}
                            color={nameError ? 'error' : 'primary'}
                        />
                    </FormControl>
                )}
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                    </Box>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>

                <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
                    {isSignup ? 'Sign up' : 'Sign in'}
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    {isSignup ? "Already have an account" : "Don't have an account"}?{' '}
                    <span>
                        <Link
                            href={isSignup ? "/" : "/signup"}
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            {isSignup ? "Sign in" : "Sign up"}
                        </Link>
                    </span>
                </Typography>
            </Box>
        </Card>
    );
}