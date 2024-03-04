/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    env: {
      CORBADO_API_SECRET: process.env.CORBADO_API_SECRET,
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      nextPublicCorbadoProjectId: process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID,
    },
    serverRuntimeConfig: {
      // Will only be available on the server side
      corbadoApiSecret: process.env.CORBADO_API_SECRET,
    },
  }
  
  module.exports = nextConfig;