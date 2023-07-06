'use client';

import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import z from "zod";

let renderCount = 0;

export const EditProfile = () => {

    renderCount++;

    const { data: session, status, update } = useSession();

    const EditProfileForm = z.object({
        name: z.string().min(1, { message: `We'd like to know your ` }),
        name: z.string().min(1, { message: 'Email is required.' }),
    });

    type EditProfileSchema = z.infer<typeof EditProfileForm>;

    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors
        }
    } = useForm<EditProfileSchema>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(LoginForm)
    });

}