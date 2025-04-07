import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerPlayer } from "@/api/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: registerPlayer,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    mutate(data);
  };

  const isLoading = isPending || isSubmitting;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create a new account to start betting.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input type="text" id="name" {...register("name")} />
            {errors.name && (
              <FormMessage role="alert">{errors.name.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input type="email" id="email" {...register("email")} />
            {errors.email && (
              <FormMessage role="alert">{errors.email.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input type="password" id="password" {...register("password")} />
            {errors.password && (
              <FormMessage role="alert">{errors.password.message}</FormMessage>
            )}
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="confirmPassword">Confirm Password:</FormLabel>
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <FormMessage role="alert">
                {errors.confirmPassword.message}
              </FormMessage>
            )}
          </FormItem>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      {isError && <FormMessage role="alert">{error.message}</FormMessage>}
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </Card>
  );
}
