'use client'

import Head from "next/head";

export default function Home() {
    return (
        <div>
            <Head>
                <script src="https://auth.corbado.com/auth.js" defer></script>
            </Head>

            <corbado-auth project_id={process.env.NEXT_PUBLIC_PROJECT_ID} conditional="yes">
                <input name="username" id="corbado-username" required autoComplete="webauthn" />
            </corbado-auth>
        </div>
    )
}
