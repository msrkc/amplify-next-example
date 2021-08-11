import { withSSRContext } from "aws-amplify";

export default function Protected({ authenticated, username, jwt }) {
  if (authenticated) {
    return (
      <div>
        <h1>user: {username}</h1>
        <pre className="">
          {JSON.stringify({ authenticated, username, jwt }, null, 2)}
        </pre>
      </div>
    );
  } else {
    return <h1> go to login</h1>;
  }
}

export async function getServerSideProps({ req }) {
  const { Auth } = withSSRContext({ req });

  try {
    const user = await Auth.currentAuthenticatedUser();
    const session = await Auth.currentSession();
    return {
      props: {
        authenticated: true,
        username: user.username,
        jwt: session.accessToken.jwtToken,
      },
    };
  } catch (error) {
    return {
      props: { authenticated: false },
    };
  }
}
