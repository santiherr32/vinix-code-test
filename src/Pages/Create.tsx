import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import MessageAlert, { MessageAlertElement } from '../components/MessageAlert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import './Create.scss';

interface PostData {
  readonly title: string;
  readonly body: string;
}

function Create() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  //   const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<PostData>({
    title: '',
    body: ''
  });
  const [showAlert, setShowAlert] = useState<MessageAlertElement>({
    message: '',
    visible: false,
    type: 'success'
  });
  const formRef = useRef(null);

  const updatePostCreationResult = (data: Record<string, unknown>) => {
    if (data.id) {
      setShowAlert({
        message: 'The post was created successfully',
        visible: true,
        type: 'success'
      });
      // setIsLoading(false);
      setInputs({
        title: '',
        body: ''
      });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const createPost = async () => {
    try {
      const headersList = {
        Accept: '*/*',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      };
      //   const formData = new FormData(formRef.current);
      const response = await (
        await fetch('http://front-test.vinixcode.cloud:8000/api/v1/post', {
          method: 'POST',
          headers: headersList,
          body: JSON.stringify(inputs)
        })
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
    if (inputs.title && inputs.body) {
      createPost().then((data) => updatePostCreationResult(data));
    }
  };

  return (
    <div className="create-page-wrapper">
      <header>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </header>
      <main>
        <Form className="create-form" ref={formRef}>
          <MessageAlert showAlert={showAlert} />
          <Form.Group>
            <Form.Label htmlFor="title">
              <span>Title: </span>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              id="title"
              minLength={8}
              maxLength={20}
              value={inputs.title}
              required={true}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="body">Content: </Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="body"
              id="body"
              maxLength={288}
              value={inputs.body}
              required={true}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!(inputs.title && inputs.body)}
          >
            Create post
          </Button>
        </Form>
      </main>
    </div>
  );
}

export default Create;
