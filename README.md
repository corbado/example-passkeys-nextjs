# Complete passkeys integration example for Next.js with Corbado

This is a sample implementation of the Corbado webcomponent being integrated into a web application built with Next.js.

## File structure

- `src/app` contains `page.tsx`, the file where the web component is embedded
- `delcaration.d.ts` contains type declarations you need to add as well to make the web component work in TypeScript

## Setup

### Prerequisites

Please follow the steps in [Getting started](https://docs.corbado.com/overview/getting-started) to create and configure
a project in the [Corbado developer panel](https://app.corbado.com).

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
