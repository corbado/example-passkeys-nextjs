import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';
import dynamic from "next/dynamic";

const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;

interface User {
    ID: string;
    created: string;
    emails: Email[];
    fullName: string;
    name: string;
    phoneNumbers: any[];
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


export default function Profile() {
    const [Corbado, setCorbado] = useState<any>(null);
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState(null);
    //const session = new Corbado.Session(process.env.NEXT_PUBLIC_PROJECT_ID);


    useEffect(() => {
        // This will run only on client-side
        import('@corbado/webcomponent')
            .then(module => {
                const Corbado = module.default || module;
                setCorbado(Corbado);
                const session = new Corbado.Session(projectID);
                setSession(session);
            })
            .catch(() => {
                // Handle error properly
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

    const handleLogout = async () => {
        if (session) {
            // @ts-ignore
            await session.logout();
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            {/*<button onClick={handleLogout}>Logout</button>*/}
            {user &&
                <div>
                    <p>
                        {user.fullName} logged in with email address: {user.emails[0].email}
                    </p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            }
        </div>
    );
}
