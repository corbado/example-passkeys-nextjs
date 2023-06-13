import styles from './../page.module.css'
// @ts-ignore
import {Corbado} from '@corbado/nodejs';
// @ts-ignore
import {Configuration} from "@corbado/nodejs/src/config/configuration";
import {NextPage, GetServerSideProps} from "next";

const config = new Configuration();
config.projectID = process.env.PROJECT_ID;
config.apiSecret = process.env.API_SECRET;
config.issuer = "https://auth.corbado.com";
config.jwksURI = `https://${process.env.PROJECT_ID}.auth.corbado.com/.well-known/jwks`;
const corbado = new Corbado(config);

interface User {
    name: string;
}

interface LoggedInPageProps {
    user: User | null;
}

const LoggedInPage: NextPage<LoggedInPageProps> = ({user}) => {

    if (!user) {
        return <h1>Authentication failed</h1>;
    }

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <h1>You are logged in</h1>
                <p>Welcome, {user.name}!</p>
            </div>
        </main>
    )
}

const getServerSideProps: GetServerSideProps<LoggedInPageProps> = async (context) => {
    let user: User | null = null;

    try {

        const req = {
            ...context.req,
            body: {},
            params: {}
        }

        const token = await corbado.shortSession.validate(req);
        console.log(token);
        user = token;
    } catch (err) {
        console.error(err);
    }

    return {
        props: {
            user
        }
    }
}

export default LoggedInPage;



