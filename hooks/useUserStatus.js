import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

function useUserStatus() {
  let [user, setUser] = useState(null);

  useEffect(() => {
    let updateUser = async () => {
      try {
        let user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    };
    Hub.listen("auth", updateUser);

    updateUser();
    return () => Hub.remove("auth", updateUser); // cleanup
  }, []);

  return user;
}

export default useUserStatus;
