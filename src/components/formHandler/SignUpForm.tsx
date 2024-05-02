import React, { useState } from "react";

interface ISignUp {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<ISignUp>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ISignUp>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState<boolean>(true);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError: boolean = false;
    const newErros: ISignUp = { ...errors };

    if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      newErros.email = "Please enter a valid email address";
      hasError = true;
    } else {
      newErros.email = "";
    }

    if (formData.password.length < 8) {
      newErros.password = "Password must be at least 8 characters";
      hasError = true;
    } else {
      newErros.password = "";
    }

    if (formData.password !== formData.confirmPassword) {
      newErros.confirmPassword = "Passwords do not match";
      hasError = true;
    } else {
      newErros.confirmPassword = "";
    }

    if (hasError) {
      setErrors(newErros);
      return;
    } else {
      console.log(formData);
      setShow(false);
      setDisabled(true)
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };
  return (
    <>
      <div className=" w-full h-[100vh] flex justify-center items-center">
        <div className=" flex flex-col gap-7 bg-slate-300 px-10 py-10 rounded-xl shadow-2xl">
          <div className=" text-2xl font-bold text-center">SignUpForm</div>
          <div>
            <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
              <div className=" flex justify-between items-center">
                <label htmlFor="email" className=" font-semibold mr-24">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-72 px-2 py-2 rounded-lg ${
                    errors.email ? "border-red-500" : "outline-blue-700"
                  }`}
                />
                <div>{errors.email && <span>{errors.email}</span>}</div>
              </div>
              <div>
                <label htmlFor="password" className=" font-semibold mr-16">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-72 px-2 py-2 rounded-lg ${
                    errors.password ? "border-red-500" : "outline-blue-700"
                  }`}
                />
                <div className=" ml-32 text-red-600">{errors.password && <span>{errors.password}</span>}</div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className=" font-semibold mr-2">ConfirmPassword</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className=" w-72 px-2 py-2 rounded-lg bg-slate-200 outline-blue-700"
                />
                <div className=" ml-32 text-red-600">
                  {errors.confirmPassword && (
                    <span>{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
              <div className=" flex justify-end">
                <button disabled={disabled} type="submit" className={show ? "block bg-blue-700 px-6 py-2 rounded-xl text-white font-semibold" : "disabled:opacity-20"}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
