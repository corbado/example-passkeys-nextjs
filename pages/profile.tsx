import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';


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
    const {corbadoAuthToken} = router.query as { corbadoAuthToken?: string };
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
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

    return (
        <div>
            <h1>Profile Page</h1>
            {/*<button onClick={handleLogout}>Logout</button>*/}
            {user &&
                <p>
                    {user.fullName} logged in with email address: {user.emails[0].email}
                </p>}
        </div>
    );
}
