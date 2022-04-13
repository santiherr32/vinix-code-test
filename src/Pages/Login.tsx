import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import './Login.scss';

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
  const formRef = useRef(null);
  const navigate = useNavigate();

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
      if (info.error) alert('User was not found. Check again');
      else alert(JSON.stringify(info));
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
    <form className="login-form" ref={formRef}>
      <label className="form-label" htmlFor="email">
        <span>Email: </span>
        <input
          className="form-control"
          type="email"
          name="email"
          id="email"
          value={inputs.email}
          required={true}
          onChange={handleChange}
        />
      </label>
      <label className="form-label" htmlFor="password">
        <span>Password: </span>
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          required={true}
          value={inputs.password}
          onChange={handleChange}
        />
      </label>
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={inputs.email && inputs.password ? false : true}
      >
        Submit
      </Button>
    </form>
  );
}

export default Login;
