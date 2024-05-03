import { zodResolver } from '@hookform/resolvers/zod';
import { dividerClasses } from '@mui/material';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'

const schema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

function FormHook() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
        email: "test@email.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit : SubmitHandler<FormFields> = async (data) => {
    try{
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
    }catch (error) {
        setError("root", {
            message: "This email is already taken",
        });
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username")} type='text' placeholder='username'/>
            {errors.username && (<div>{errors.username.message}</div>)}
            <input {...register("email")} type='text' placeholder='email'/>
            {errors.email && (<div>{errors.email.message}</div>)}
            <input {...register("password")} type='password' placeholder='password' />
            {errors.password && (<div>{errors.password.message}</div>)}
            <button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading..." : "Submit"}
            </button>
            {errors.root && <div className="text-red-500">{errors.root.message}</div>}
        </form>
    </div>
  )
}

export default FormHook