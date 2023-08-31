import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

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

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState(null);
    const router = useRouter();

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
                setUser(user);
            });
        }
    }, [session]);

    const handleLogout = async () => {
        // @ts-ignore
        await session.logout();
        router.push("/");

    }

    return (
        <div>
            {user &&
                <div>
                    <h1>Profile Page</h1>
                    <div>
                        <p>
                            User-ID: {user.userID}
                            <br/>
                            Email: {user.email}
                        </p>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            }

            {!user &&
                <div>
                    <p>You&apos;re not logged in.</p>
                    <p>Please go back to <a href="/">home</a> to log in.</p>
                </div>

            }

        </div>
    );
}