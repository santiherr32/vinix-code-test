import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import MessageAlert, { MessageAlertElement } from '../components/MessageAlert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.scss';

interface UserData {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly password_confirmation: string;
}

function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [showAlert, setShowAlert] = useState<MessageAlertElement>({
    message: '',
    visible: false,
    type: 'success'
  });

  const formRef = useRef(null);

  function togglePasswordVisibility() {
    const x = document.getElementById('password');
    const showIcon = document.getElementById('showIcon');
    const hideIcon = document.getElementById('hideIcon');
    hideIcon.classList.remove('d-none');
    if (x.getAttribute('type') === 'password') {
      x.setAttribute('type', 'text');
      showIcon.style.display = 'none';
      hideIcon.style.display = 'block';
    } else {
      x.setAttribute('type', 'password');
      showIcon.style.display = 'block';
      hideIcon.style.display = 'none';
    }
  }

  const registerUser = async () => {
    try {
      const formData = new FormData(formRef.current);
      const response = await (
        await fetch(
          'http://front-test.vinixcode.cloud:8000/api/auth/register',
          {
            method: 'POST',
            body: formData
          }
        )
      ).json();
      // setInputs(data.inputs);
      return response;
    } catch (error) {
      return error.message;
    }
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
    registerUser().then((data) => {
      console.log(data);
      if (Object.keys(data).some((i) => i === 'user')) {
        setShowAlert({
          message: data.message,
          visible: true,
          type: 'success'
        });
        navigate('/login', {
          state: 'You were registered successfully. Now you can login'
        });
      } else {
        const response = JSON.parse(data);
        const message = Object.values(response)[0];
        setShowAlert({
          message: message,
          visible: true,
          type: 'danger'
        });
        setInputs({
          ...inputs,
          password: '',
          password_confirmation: ''
        });
      }
    });
  };

  return (
    <div className="register-page-wrapper">
      <header>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </header>
      <main>
        <Form className="register-form" ref={formRef}>
          <MessageAlert showAlert={showAlert} />
          <Form.Group>
            <Form.Label htmlFor="name">Full name: </Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              value={inputs.name}
              placeholder="David Smith"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email: </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={inputs.email}
              placeholder="davidsmith@company.com"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={inputs.password}
              placeholder="***********"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password_confirmation">Password: </Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={inputs.password_confirmation}
              placeholder="***********"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={Object.values(inputs).some((val) => !val)}
          >
            Submit
          </Button>
        </Form>
      </main>
    </div>
  );
}

export default Register;
