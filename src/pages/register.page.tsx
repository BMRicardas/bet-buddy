import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { registerPlayer } from "../api";
import { useAuth } from "../contexts/auth.context";

const MIN_PASSWORD_LENGTH = 6;

const registerSchema = z
  .object({
    name: z.string().min(1, "Please enter your name"),
    email: z
      .string()
      .min(1, "Please enter your email")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    console.log("Form submitted:", data);

    try {
      await registerPlayer(data);
      await login(data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div>
      <h1>RegisterPage</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" {...register("name")} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" {...register("password")} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
