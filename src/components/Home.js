import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';

export default function Home({ notificationCount }) {
  const [loading, setLoading] = useState(true);
  const { loadUser, currentUser } = useAuth();

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      setTimeout(() => {
        if (loadUser === false || currentUser === undefined) {
          setLoading(false);
        }
      });
    }

    return () => (mount = false);
  }, [loadUser]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Dashboard notificationCount={notificationCount} />
        </>
      )}
    </>
  );
}
