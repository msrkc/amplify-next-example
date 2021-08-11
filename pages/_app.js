import Amplify, { Auth } from "aws-amplify";
import { authConfig } from "../aws";

Amplify.configure({ Auth: { ...authConfig } });

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
