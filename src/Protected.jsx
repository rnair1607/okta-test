import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.opener.onSuccess({ test: "works!" });
  }, []);
  return <h3>Protected</h3>;
};
export default Home;
