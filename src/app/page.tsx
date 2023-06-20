import Corbado from '@corbado/webcomponent';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

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
    const [session, setSession] = useState<Corbado.Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const { corbadoAuthToken } = router.query as { corbadoAuthToken?: string };


    useEffect(() => {
        const session = new Corbado.Session(process.env.NEXT_PUBLIC_PROJECT_ID || '');
        setSession(session);

        session.refresh(user => {
            if (user) {
                console.log("User logged in: ", user);
            } else {
                console.log("No user logged in");
            }
        })

        if (corbadoAuthToken) {
            axios.post("/api/proxy", {corbadoAuthToken}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    setUser(response.data.data.user);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [corbadoAuthToken]);

    const handleLogout = async () => {
        if (session) {
            try {
                await session.logout();
                router.push('/');
            } catch (err) {
                console.error(err);
            }
        }
    }

    let loginDialog;
    if (user === null) {
        loginDialog = <div>
            <corbado-auth
                project_id={}
                endpoint={frontendAPI}
                conditional="yes">
                <input name="username" id="corbado-username" required autoComplete="webauthn"/>
            </corbado-auth>
        </div>
    } else {
        loginDialog = <div>
            {currentUser.userID}<br/>{currentUser.userIdentifier}
        </div>
    }

    return (
        <div>


            <corbado-auth project-id={process.env.NEXT_PUBLIC_PROJECT_ID} conditional="yes">
                <input name="username" id="corbado-username" required autoComplete="webauthn"/>
            </corbado-auth>
        </div>
    )
}
