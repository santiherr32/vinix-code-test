import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import './Login.scss';

interface Data {
  email: string;
  password: string;
}

function Login() {
  const [inputs, setInputs] = useState<Data>({
    email: '',
    password: ''
  });
  const formRef = useRef(null);

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
    loginUser().then((data) => console.log(data.id));
  };

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

  return (
    <form className="login-form" ref={formRef}>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        id="email"
        value={inputs.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        id="password"
        value={inputs.password}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default Login;
