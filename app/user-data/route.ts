import { NextRequest, NextResponse } from "next/server";
import getNodeSDK from "../utils/nodeSdk";

const sdk = getNodeSDK();

const secretNote = "This is your secret that can only be seen once authenticated."

export async function GET(req: NextRequest) {
    // this could also be retrieved via cookies
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return NextResponse.json({ status: 401 })
    }
    try {
        const token = authHeader.replace("Basic ", "");
        const user = await sdk.sessions().getCurrentUser(token)
        if (user.isAuthenticated()) {
            const response = {
                email: user.getEmail(),
                secretNote: secretNote
            }
            return NextResponse.json(response, { status: 200 })
        }
        throw Error
    } catch {
        NextResponse.json({ status: 403 })
    }
}