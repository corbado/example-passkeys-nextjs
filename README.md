# Corbado Next.js integration

This is a sample implementation of the Corbado webcomponent being integrated into a web page built with Next.js to
showcase passkey authentication.

## Setup

### Prerequisites

Please follow the steps in [Getting started](https://docs.corbado.com/overview/getting-started) to create and configure
a project in our [developer panel](https://app.corbado.com).

You need to have [Node](https://nodejs.org/en/download) and `npm` installed to run it.

### Configure environment variables

Use the values you obtained in [Prerequisites](#prerequisites) to configure the following variables inside an `.env`
file you create in the root folder of this project:

```sh
NEXT_PUBLIC_PROJECT_ID=<YOUR PROJECT ID>
API_SECRET=<YOUR API SECRET>
```

## Usage

Run

```bash
npm i
```

to install all dependencies.

Finally, you can run the project locally with

```bash
npm run dev
```

This will start the Next.js app on `http://localhost:3000` by default.
