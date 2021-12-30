import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import { useAuth } from '../contexts/AuthContext';
import Loading from './Loading';

export default function Home({ notificationCount, setPosts }) {
  const [loading, setLoading] = useState(true);
  const { loadUser, currentUser } = useAuth();

  const { retrievePopularPosts } = useAuth();

  useEffect(() => {
    async function retrievePosts() {
      const postsPromises = await retrievePopularPosts();
      const retrieveData = Promise.all(postsPromises).then((data) => {
        return data;
      });
      return retrieveData;
    }
    retrievePosts().then((data) => {
      console.log(data);
      setPosts(data);
    });
  }, []);

  useEffect(() => {
    let mount = true;
    if (mount === true) {
      if (loadUser === false || currentUser === undefined) {
        setLoading(false);
      }
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
