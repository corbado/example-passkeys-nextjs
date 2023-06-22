"use client"

import Corbado from "@corbado/webcomponent";
import {useRouter} from "next/router";
import '@corbado/webcomponent/pkg/auth_cui.css'
import {useEffect, useState} from "react";

interface User {
    ID: string;
    created: string;
    emails: Email[];
    fullName: string;
    name: string;
    phoneNumbers: PhoneNumber[];
    status: string;
    updated: string;
}

interface Email {
    ID: string;
    created: string;
    email: string;
    status: string;
    updated: string;
}

interface PhoneNumber {
    ID: string;
    phoneNumber: string;
    status: string;
}

export default function Home() {
    // @ts-ignore
    const [session, setSession] = useState<Corbado.Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    //const router = useRouter();


    useEffect(() => {
        const session = new Corbado.Session(process.env.NEXT_PUBLIC_PROJECT_ID || '');
        setSession(session);

        session.refresh((user: User | null) => {
            if (user) {
                console.log("User logged in: ", user);
            } else {
                console.log("No user logged in");
            }
        })
    }, []);

    const handleLogout = async () => {
        if (session) {
            try {
                await session.logout();
                //router.push('/');
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div>
            <corbado-auth project-id={process.env.NEXT_PUBLIC_PROJECT_ID} conditional="yes">
                <input name="username" id="corbado-username" required autoComplete="webauthn"/>
            </corbado-auth>
        </div>
    )
}
