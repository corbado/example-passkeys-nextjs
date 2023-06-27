'use client';

import '@corbado/webcomponent/pkg/auth_cui.css'
import {useEffect, useState} from "react";

const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;

interface User {
    userID: any;
    email: any;
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
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState(null);

    useEffect(() => {
        // This will run only on client-side
        import('@corbado/webcomponent')
            .then(module => {
                const Corbado = module.default || module;
                setSession(new Corbado.Session(projectID));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Refresh the session whenever it changes
        if (session) {
            // @ts-ignore
            session.refresh((user: any) => {
                console.log(user)
                setUser(user);
            });
        }
    }, [session]);

    return (
        <div>
            <corbado-auth-provider project-id={process.env.NEXT_PUBLIC_PROJECT_ID}>
                <div slot="unauthed">
                    <corbado-auth project-id={process.env.NEXT_PUBLIC_PROJECT_ID} conditional="yes">
                        <input name="username" id="corbado-username"
                               data-input="username" required
                               autoComplete="webauthn"/>
                    </corbado-auth>
                </div>

                <div slot="authed">
                    <h1>Profile Page</h1>
                    {user &&
                        <div>
                            <p>
                                User-ID: {user.userID}
                                <br/>
                                Email: {user.email}
                            </p>

                        </div>
                    }
                    <corbado-logout-handler project-id={process.env.NEXT_PUBLIC_PROJECT_ID}
                                            redirect-url="/">
                        <button>Logout</button>
                    </corbado-logout-handler>
                </div>
            </corbado-auth-provider>
        </div>
    )
}
