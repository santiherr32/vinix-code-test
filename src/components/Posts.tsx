import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './Posts.scss';

interface PostProps {
  tokenExists: boolean;
}

function Posts({ tokenExists }: PostProps): JSX.Element {
  const [userPosts, setUserPosts] = useState([] || '');
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  // const { state } = useContext(AppContext);

  const updateCurrentPosts = (
    data: Iterable<unknown> | ArrayLike<unknown> | string
  ) => {
    if (typeof data === 'string') {
      setUserPosts(data);
    } else {
      setUserPosts(Array.from(data));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const headersList = {
          Accept: '*/*',
          Authorization: 'Bearer ' + token
        };

        // if (token) {
        const res = await fetch(
          'http://front-test.vinixcode.cloud:8000/api/v1/post',
          {
            method: 'GET',
            headers: headersList
          }
        );
        const data = await res.json();
        return data;
        // } else {
        //   return 'Not authorized'
        // }
      } catch (error) {
        console.log(error.message);
        return error.message;
      }
    };

    // if (tokenExists && !userPosts.length) {
    getPosts().then((posts) => {
      return updateCurrentPosts(posts);
    });
    // }
  }, [token]);

  return (
    <section className="posts-container">
      {!isLoading ? (
        typeof userPosts !== 'string' ? (
          userPosts.length ? (
            <ul className="list-group">
              {userPosts?.map((post, index) => {
                return (
                  <li className="list-group-item card" key={post.id}>
                    <div className="card-body" key={index}>
                      <h1 className="card-title">{post.title}</h1>
                      <p className="card-text">{post.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h2>You have no posts yet</h2>
          )
        ) : (
          <h2>{userPosts}</h2>
        )
      ) : (
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </section>
  );
}

export default Posts;
