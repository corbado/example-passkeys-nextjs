import {cookies} from "next/headers";
import getNodeSDK from "@/app/_utils/nodeSdk";
import {redirect} from "next/navigation";
import LogoutButton from "@/app/_utils/LogoutButton";
import PasskeyList from "@/app/_utils/PasskeyList";

// the user data will be retrieved server side
export default async function Profile() {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("cbo_session_token");
    if (!sessionToken) {
        return redirect("/");
    }

    const sdk = getNodeSDK();
    let user;
    try {
        user = await sdk.sessions().validateToken(sessionToken.value);
    } catch {
        return redirect("/");
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <p>
                User-ID: {user.userId}<br/>
                Full name: {user.fullName}
            </p>
            <LogoutButton/>
            <PasskeyList/>
        </div>
    )
}