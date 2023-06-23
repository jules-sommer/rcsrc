# RCSrc Canada

This is the source code for the front-end, back-end, and API of RCSrc Canada's main website. RCSrc Canada is a Canadian research chemical supplier with owners and staff who are passionate about novel APIs, the synthesis thereof, and uncovering fascinating structure-activity relationships to benefit the field of organic chemistry, pharmacology, and synthesis. We are dedicated to bringing Canadian researchers a range of novel compounds covering research areas and receptor-binding profiles often overlooked - allowing researchers a chance to continue to advance their discovery.

Our tech stack is built upon Next.js and React, utilizing SSR and the new Next.js 13 App router. We use MongoDB to store data about products, sessions, and orders - and we use AWS for authentication to the back-end for admin's and for customers as well. It is all bundled into a serverless Dockerized build which is then automatically deployed to AWS Amplify.

```js
// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: 'standalone',
}
```
Is the code that tells Next.js to build a serverless containerized output.

## How to build

Currently, we ignore ESLint errors on build as it was integrated midway through development and thus our code does not always follow a consistent style - this is an issue we are working on. However, you can run the following command to build our container via the Dockerfile:

#Build: `docker build -t rcsrc-canada:latest .`
#Run `docker run -p 3000:80 rcsrc-canada:latest`

This build is also stored on the public Docker registry.

## Using the API



## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
