import { cookies } from "next/headers";
import getNodeSDK from "../utils/nodeSdk";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../utils/LogoutButton";


// the user data will be retrieved server side
export default async function Profile() {
    const cookieStore = cookies();
    const session = cookieStore.get("cbo_short_session");
    if (!session) {
        return redirect("/auth");
    }
    const sdk = getNodeSDK();
    let user;
    try {
        user = await sdk.sessions().getCurrentUser(session.value);
        if (!user.isAuthenticated()) {
            throw Error;
        }
    }
    catch {
        return redirect("/auth");
    }
    return (
        <div>
            <h1>Profile Page</h1>
        <p>
            User-ID: { user.getID() }<br />
            Email: { user.getEmail() }
        </p>
        <Link href="/">Go to Home</Link>
        <LogoutButton />
        </div>
    )
}