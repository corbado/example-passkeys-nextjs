import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';
import dynamic from "next/dynamic";

//import Corbado from '@corbado/webcomponent';
const session = null;
import('@corbado/webcomponent').then(module => {
    const Corbado = module.default || module;
    const session = new Corbado.Session(process.env.NEXT_PUBLIC_PROJECT_ID);

    console.log(session)
});


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
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState(null);
    //const session = new Corbado.Session(process.env.NEXT_PUBLIC_PROJECT_ID);

    useEffect(() => {
        if (session) {
            // @ts-ignore
            session.refresh(user => {
                console.log(user)
            })
        }

        console.log("User: ", user)


    }, [session]);

    const handleLogout = async () => {
        // @ts-ignore
        await session.logout();
        //router.push("/");

    }

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
