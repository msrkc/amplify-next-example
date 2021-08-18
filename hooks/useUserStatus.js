import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

function useUserStatus() {
  let [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let updateUser = async () => {
      try {
        let session = await Auth.currentSession();
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
        setSession(session);
      } catch {
        setUser(null);
        setSession(null);
        // const userGroups = session.getAccessToken().decodePayload()["cognito:groups"];
      }
    };
    Hub.listen("auth", updateUser);

    updateUser();
    return () => Hub.remove("auth", updateUser); // cleanup
  }, []);

  useEffect(() => {
    console.log(
      session && session.getAccessToken().decodePayload()["cognito:groups"]
    );
  }, [session]);
  return { user, session };
}

export default useUserStatus;
