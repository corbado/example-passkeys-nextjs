'use client';

import '@corbado/webcomponent/pkg/auth_cui.css'
// @ts-ignore
import {useEffect} from "react";
import Head from 'next/head';



export default function Home() {

    useEffect(() => {
        import('@corbado/webcomponent');
    }, []);

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
                    You're logged in.
                    <corbado-logout-handler project-id={process.env.NEXT_PUBLIC_PROJECT_ID}
                                            redirect-url="http://localhost:3000">
                        <button>Logout</button>
                    </corbado-logout-handler>
                </div>
            </corbado-auth-provider>
        </div>
    )
}
