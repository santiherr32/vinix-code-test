import { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './Posts.scss';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface PostProps {
  tokenExists: boolean;
}

function Posts({ tokenExists }: PostProps): JSX.Element {
  const [userPosts, setUserPosts] = useState({
    posts: [],
    message: 'fetching'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [showToast, setShowToast] = useState({
    message: '',
    visible: false
  });

  // const { state } = useContext(AppContext);
  const updateCurrentPosts = useCallback(
    (data: Iterable<unknown> | ArrayLike<unknown> | string) => {
      if (typeof data === 'string') {
        setUserPosts({
          posts: [],
          message: data
        });
      } else {
        setUserPosts({
          posts: Array.from(data),
          message: ''
        });
      }
      setIsLoading(false);
    },
    []
  );

  const handleDeletion = async (postId: number) => {
    try {
      await fetch(
        'http://front-test.vinixcode.cloud:8000/api/v1/post/' + postId,
        {
          method: 'DELETE'
        }
      ).then((res) => {
        setIsLoading(true);
        if (res.status === 204) {
          // setTimeout(() => {
          setShouldUpdate(true);
          // }, 500);
          setIsLoading(false);
          setShowToast({
            message: 'The post was deleted',
            visible: true
          });
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoading(true);

    const getPosts = async () => {
      console.log('getting posts');
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
        console.log(error);
        return error;
      }
    };

    getPosts().then((posts) => updateCurrentPosts(posts));
  }, [tokenExists, shouldUpdate, updateCurrentPosts]);

  return (
    <section className="posts-container">
      {!isLoading ? (
        typeof userPosts !== 'string' ? (
          userPosts.posts.length ? (
            <ListGroup>
              {userPosts.posts?.map((post, index) => {
                return (
                  <Card key={post.id}>
                    <Card.Body key={index}>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.body}</Card.Text>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeletion(post.id)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </ListGroup>
          ) : userPosts.message === 'fetching' ? (
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
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
      <ToastContainer
        position="bottom-start"
        className="position-sticky start-0 mb-3"
        style={{ bottom: '10%' }}
      >
        <Toast
          className="bg-success text-white w-100"
          onClose={() => setShowToast({ message: '', visible: false })}
          show={showToast.visible}
          delay={10000}
          autohide
        >
          <Toast.Body className="text-start">{showToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </section>
  );
}

export default Posts;
