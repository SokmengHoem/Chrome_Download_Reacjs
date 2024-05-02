import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const ReactHookZodForm = () => {
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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="text" placeholder="Email" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};

export default ReactHookZodForm;


// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';

// const schema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
//   confirmPassword: z.string().min(8)
// });

// type FormData = z.infer<typeof schema>;

// const ReactHookZodForm: React.FC = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//     resolver: zodResolver(schema)
//   });

//   const onSubmit = (data: FormData) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input type="email" id="email" {...register("email")} />
//         {errors.email && <span>{errors.email.message}</span>}
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input type="password" id="password" {...register("password")} />
//         {errors.password && <span>{errors.password.message}</span>}
//       </div>
//       <div>
//         <label htmlFor="confirmPassword">Confirm Password</label>
//         <input type="password" id="confirmPassword" {...register("confirmPassword")} />
//         {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
//       </div>
//       <div>
//         <button type="submit">Submit</button>
//       </div>
//     </form>
//   );
// };

// export default ReactHookZodForm;
