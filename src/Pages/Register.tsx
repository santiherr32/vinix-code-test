import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import './Register.scss';

interface UserData {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly password_confirmation: string;
}

function Register() {
    const [inputs, setInputs] = useState<UserData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const formRef = useRef(null);

    const registerUser = async () => {
        try {
            const formData = new FormData(formRef.current);
            const response = await (
                await fetch(
                    'http://front-test.vinixcode.cloud:8000/api/auth/register',
                    {
                        method: 'POST',
                        body: formData,
                    },
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
            [inputName]: inputValue,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        registerUser().then((data) => console.log(data.id));
    };

    return (
        <form className="register-form" ref={formRef}>
            <label htmlFor="name">Full name: </label>
            <input
                type="text"
                name="name"
                id="name"
                value={inputs.name}
                onChange={handleChange}
            />
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
            <label htmlFor="password_confirmation">Password: </label>
            <input
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                value={inputs.password_confirmation}
                onChange={handleChange}
            />
            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    );
}

export default Register;
