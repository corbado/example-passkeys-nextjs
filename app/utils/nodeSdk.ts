import { Config, SDK } from '@corbado/node-sdk';

const projectID = process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID!;
const apiSecret = process.env.CORBADO_API_SECRET!

const config = new Config(projectID, apiSecret);
const sdk = new SDK(config);

export default function getNodeSDK() {
    return sdk;
}