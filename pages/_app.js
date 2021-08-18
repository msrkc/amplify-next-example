import Amplify, { Auth } from "aws-amplify";
import Head from "next/head";
import { authConfig } from "../aws";
Amplify.configure({ Auth: { ...authConfig } });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
