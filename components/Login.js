import React from "react";

import { signIn, signUp, confirmSignUp } from "../services/amplify";

const Login = () => {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isRegister, setIsRegister] = React.useState(false);
  const [notConfirmed, setNotConfirmed] = React.useState(false);
  const [confirmationCode, setConfirmationCode] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  React.useEffect(() => {
    setError(null);
  }, [username, password, email, confirmationCode]);

  React.useEffect(() => setSuccess(null), [error]);

  return (
    <main className="container mx-auto p-4 mt-12 bg-white flex flex-col items-center justify-center text-gray-700">
      {loading ? (
        "loading.."
      ) : (
        <>
          <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
            <h1 className="text-4xl font-semibold ">
              {notConfirmed ? "Confirm your account" : "Welcome back."}
            </h1>
            {error ? <span className="text-red-600 mb-5">{error}</span> : ""}
            {success ? (
              <span className="text-green-600 mb-5">{success}</span>
            ) : (
              ""
            )}
          </div>
          <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
            {notConfirmed ? (
              <>
                <input
                  className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUserName(e.target.value)}
                />
                <input
                  className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                  type="text"
                  placeholder="Confirmation code"
                  value={confirmationCode}
                  onChange={e => setConfirmationCode(e.target.value)}
                />
              </>
            ) : (
              <>
                <input
                  className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUserName(e.target.value)}
                />
                <input
                  className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                {isRegister && (
                  <input
                    className="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                )}
              </>
            )}

            <div className="flex items-center">
              {notConfirmed ? (
                <button
                  className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
                  type="submit"
                  onClick={() => {
                    setLoading(true);
                    confirmSignUp(username, confirmationCode)
                      .then(e => {
                        setLoading(false);
                        setNotConfirmed(false);
                        setSuccess("Confirmation successful please login");
                      })
                      .catch(e => {
                        setLoading(false);
                        setError(e.message);
                      });
                  }}
                >
                  Confirm register
                </button>
              ) : (
                <>
                  {isRegister ? (
                    <button
                      className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
                      type="submit"
                      onClick={() => {
                        setLoading(true);
                        signUp(username, password, email)
                          .then(e => {
                            setLoading(false);
                            setIsRegister(false);
                            setSuccess("Signup successful please login");
                          })
                          .catch(e => {
                            setLoading(false);
                            setError(e.message);
                          });
                      }}
                    >
                      Register
                    </button>
                  ) : (
                    <button
                      className="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900"
                      type="submit"
                      onClick={() => {
                        setLoading(true);
                        signIn(username, password)
                          .then(e => {
                            setLoading(false);
                          })
                          .catch(e => {
                            if (e.code === "UserNotConfirmedException") {
                              setNotConfirmed(true);
                            }
                            setLoading(false);
                            setError(e.message);
                          });
                      }}
                    >
                      Log In
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          {notConfirmed ? (
            ""
          ) : (
            <div className="text-right w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
              <a
                className="text-sm font-bold text-teal-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(isRegister => !isRegister)}
              >
                {isRegister
                  ? "I already have account"
                  : "I don't have account yet."}
              </a>
            </div>
          )}
          <div className="flex justify-center w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12"></div>
        </>
      )}
    </main>
  );
};

export default Login;
