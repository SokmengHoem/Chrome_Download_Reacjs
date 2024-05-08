import React, { useState } from 'react'

interface ILogin {
    username: string;
    email: string;
    password: string;
}

const TestForm = () => {
    const [formData, setFormData] = React.useState<ILogin>({
        username: "",
        email: "",
        password: "",
    });
    const [error , setError] = useState<ILogin>({
        username: "",
        email: "",
        password: "",
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
           ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let hasError = false;
        const newErros = {...error};

        if (formData.username.length < 0 ) {
            newErros.username = "Username is required";
            hasError = true;
        }else{
            newErros.username = "";
        }

        if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            newErros.email = "Please enter a valid email address";
            hasError = true;
        }else {
            newErros.email = "";
        }

        if (formData.password.length < 8) {
            newErros.password = "Password must be at least 8 characters"
            hasError = true;
        }else {
            newErros.password = "";
        }

        if (hasError) {
            setError(newErros);
            return;
        }else{
            setError({
                username: "",
                email: "",
                password: "",
            });
            console.log(formData);
        }
        
    }
  return (
    <div>
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name='username' value={formData.username} required onChange={handleChange}  className=' border-2'/>
                    <div>{error.username}</div>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' name='email' value={formData.email} onChange={handleChange} required className=' border-2'/>
                    <div>{error.email}</div>
                </div>
                <div>
                    <label htmlFor="passaword">Password</label>
                    <input type="password" id='password' name='password' value={formData.password} onChange={handleChange} required className=' border-2'/>
                    <div>{error.password}</div>
                </div>
                <div>
                    <button className=' px-4 py-2 rounded-xl bg-pink-600 text-white'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default TestForm