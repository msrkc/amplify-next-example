import { withSSRContext } from "aws-amplify";
import React from "react";

export default function Protected() {
  return (
    <div>
      <h1>admin</h1>
      <pre className="">
        {/* {JSON.stringify({ authenticated, username, jwt }, null, 2)} */}
      </pre>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { Auth } = withSSRContext({ req });
  const session = await Auth.currentSession();
  const authGroups = ["admin", "superadmin"];
  const userGroups = session?.getAccessToken().decodePayload()[
    "cognito:groups"
  ][0];
  const isAdmin = authGroups.includes(userGroups);

  if (!isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
