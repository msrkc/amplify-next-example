import Amplify, { withSSRContext } from "aws-amplify";
import { authConfig } from "../../aws";

Amplify.configure({ ...authConfig, ssr: true });
export default async (req, res) => {
  const { Auth } = withSSRContext({ req });

  let token;
  try {
    token = await Auth.currentSession();
  } catch (err) {
    return res.status(400);
  }

  res.statusCode = 200;
  res.json({
    jwt: token ? token.accessToken.jwtToken : null,
  });
};
