import { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router';
import './Login.scss';
import MessageAlert, { MessageAlertElement } from '../components/MessageAlert';
import { Link } from 'react-router-dom';

interface Data {
  email: string;
  password: string;
}

function Login() {
  // const [tokenExists, setTokenExists] = useState(false);
  // const { state, dispatch } = useContext(AppContext);
  const [inputs, setInputs] = useState<Data>({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState<MessageAlertElement>({
    message: '',
    visible: false,
    type: 'success'
  });
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state)
      setShowAlert({
        message: `${location.state}`,
        visible: true
      });

    return () => {
      setShowAlert({ message: '', visible: false });
    };
  }, [location]);

  const loginUser = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await (
        await fetch('http://front-test.vinixcode.cloud:8000/api/auth/login', {
          method: 'POST',
          body: formData
        })
      ).json();
      // setInputs(data.inputs);
      return response;
    } catch (error) {
      return error.message;
    }
  };

  const saveLocalLoginInfo = (info: {
    access_token: string;
    error: string;
  }) => {
    if (!info.access_token) {
      if (info.error) {
        setShowAlert({
          message: 'User was not found. Check again',
          visible: true,
          type: 'danger'
        });
        // setTimeout(() => {
        // setShowAlert({ message: '', visible: false });
        // }, 5000);
      } else alert(JSON.stringify(info));
      return;
    }
    localStorage.setItem('token', info.access_token);
    navigate('/');
    // dispatch({
    //     type: 'SET_TOKEN',
    //     payload: info.access_token,
    // })
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputName: string = e.target.name;
    const inputValue: string = e.target.value;
    e.preventDefault();
    setInputs({
      ...inputs,
      [inputName]: inputValue
    });
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputs.email && inputs.password) {
      loginUser().then((data) => saveLocalLoginInfo(data));
    }
  };

  return (
    <div className="login-page-wrapper">
      <header>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </header>
      <main>
        <Form className="login-form" ref={formRef}>
          <MessageAlert showAlert={showAlert} />
          <Form.Group>
            <Form.Label htmlFor="email">
              <span>Email: </span>
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={inputs.email}
              placeholder="davidsmith@company.com"
              required={true}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="form-label" htmlFor="password">
              <span>Password: </span>
            </Form.Label>
            <Form.Control
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={inputs.password}
              placeholder="***********"
              required={true}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!(inputs.email && inputs.password) ? true : false}
          >
            Login
          </Button>
        </Form>
        <section>
          <span>Or you can </span>
          <Button>
            <Link to="/register">Register</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}

export default Login;
