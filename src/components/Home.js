import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function Home(props) {
  const [loading, setLoading] = useState(true);
  const { loadUser, currentUser } = useAuth();

  useEffect(() => {
    console.log(loadUser);
    if (loadUser === false || currentUser === undefined) {
      setLoading(false);
    }
  }, [loadUser]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Dashboard />
        </div>
      )}
    </>
  );
}
