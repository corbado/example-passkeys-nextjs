'use client'

import styles from './page.module.css'
import dynamic from 'next/dynamic'
 
const CorbadoWebComponent = dynamic(() => import("@corbado/webcomponent"), {
  loading: () => <p>Loading...</p>,
})
 

export default function Home() {

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <h1>Corbado Example Next.js</h1>
                <corbado-auth project_id={process.env.NEXT_PUBLIC_PROJECT_ID} conditional="yes">
                    <input name="username" id="corbado-username" required autoComplete="webauthn" autoFocus/>
                </corbado-auth>
            </div>
        </main>
    )
}
