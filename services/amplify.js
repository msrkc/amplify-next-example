import { Auth } from "aws-amplify";

export async function signOut() {
  try {
    return await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
    throw error;
  }
}

export async function signIn(username, password) {
  try {
    const user = await Auth.signIn(username, password);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signUp(username, password, email) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log("error signing up:", error);
    throw error;
  }
}

export async function confirmSignUp(username, code) {
  try {
    const confirmed = Auth.confirmSignUp(username, code);
    console.log(confirmed);
    return confirmed;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
