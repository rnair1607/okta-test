import React, { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

const SignInForm = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessiontoken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // document.addEventListener("message", (event) => {
    //   const dataTest = {
    //     data: "Hello",
    //   };

    //   event.source.postMessage(JSON.stringify(dataTest), event.target);
    // });

    oktaAuth
      .signInWithCredentials({ username, password })
      .then((res) => {
        const sessionToken = res.sessionToken;
        setSessionToken(sessionToken);
        // sessionToken is a one-use token, so make sure this is only called once
        oktaAuth.signInWithRedirect({ sessionToken });
        console.log(sessiontoken);
      })
      .catch((err) => console.log("Found an error", err));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // if (sessionToken) {
  //   // Hide form while sessionToken is converted into id/access tokens
  //   return null;
  // }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <label>
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};
export default SignInForm;
