import axios from 'axios';
import {NextApiRequest, NextApiResponse} from 'next'

interface ClientInfo {
    userAgent: string;
    remoteAddress: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userAgent: string = req.headers['user-agent'] || '';
    const remoteAddress: string | string[] | null = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;

    // @ts-ignore
    const clientInfo: ClientInfo = {userAgent, remoteAddress}
    const {corbadoSessionToken} = req.body;
    const projectID: string = process.env.NEXT_PUBLIC_PROJECT_ID as string;
    const apiSecret: string = process.env.API_SECRET as string;

    try {
       const response = await axios.post("https://api.corbado.com/v1/sessions/verify", {
            token: corbadoSessionToken,
            clientInfo
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username: projectID,
                password: apiSecret
            }
        })


        res.status(200).json(response.data);
    } catch (error: any) {
        console.error(error);
        // Forward status code from Corbado's API if available, otherwise default to 500
        const responseStatus = error.response?.status;
        res.status(responseStatus ? responseStatus : 500).json({message: error.message});
    }

};