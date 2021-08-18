import Head from "next/head";
import Link from "next/link";

import Login from "../components/Login";
import Header from "../components/Header";

import useUserStatus from "../hooks/useUserStatus";

export default function Home() {
  const { user, session } = useUserStatus();
  const authGroups = ["admin", "superadmin"];
  const userGroups = session?.getAccessToken().decodePayload()[
    "cognito:groups"
  ][0];
  const isAdmin = authGroups.includes(userGroups);
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <Header />
      <main className="container mx-auto p-4 mt-1 bg-white flex flex-col items-center justify-center text-gray-700">
        {user ? (
          <div className="flex flex-col place-items-center">
            <h1 className="text-2xl mb-5">Login successful</h1>
            <Link href="/protected">getServerSideProps example</Link>
            <Link href="/admin">getServerSideProps admin example</Link>
            {isAdmin && (
              <h2 className="text-red-800 text-lg">you are admin!</h2>
            )}
          </div>
        ) : (
          <Login />
        )}
      </main>
    </>
  );
}
