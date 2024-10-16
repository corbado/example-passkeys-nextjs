import { Config, SDK } from '@corbado/node-sdk';

const projectID = process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID!;
const apiSecret = process.env.CORBADO_API_SECRET!
const frontendAPI = process.env.CORBADO_FRONTEND_API!;
const backendAPI = process.env.CORBADO_BACKEND_API!;

const config = new Config(projectID, apiSecret, frontendAPI, backendAPI);
const sdk = new SDK(config);

export default function getNodeSDK() {
    return sdk;
}