import Head from "next/head";
import Link from "next/link";

import Login from "../components/Login";
import Header from "../components/Header";

import useUserStatus from "../hooks/useUserStatus";

export default function Home() {
  const user = useUserStatus();

  return (
    <>
      <Head>
        <title>My page title</title>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <main className="container mx-auto p-4 mt-1 bg-white flex flex-col items-center justify-center text-gray-700">
        {user ? (
          <div className="flex flex-col place-items-center">
            <h1 className="text-2xl mb-5">Login successful</h1>
            <Link href="/protected">getServerSideProps example</Link>
          </div>
        ) : (
          <Login />
        )}
      </main>
    </>
  );
}
