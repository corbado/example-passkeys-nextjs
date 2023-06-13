import styles from './page.module.css'
import dynamic from "next/dynamic";

const CorbadoWebComponent = dynamic(
    () => import("@corbado/webcomponent") as Promise<{ default: React.ComponentType<any> }>,
    {ssr: false}
);

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <h1>Corbado Example Next.js</h1>
                <CorbadoWebComponent project_id={process.env.NEXT_PUBLIC_PROJECT_ID} conditional="yes">
                    <input name="username" id="corbado-username" value="" required autoComplete="webauthn" autoFocus/>
                </CorbadoWebComponent>
            </div>
        </main>
    )
}
