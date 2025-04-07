import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginPlayer } from "../api/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter a password"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    mutate(data);
  };

  const isLoading = isPending || isSubmitting;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Use your credentials to login to your account.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      {isError && <FormMessage role="alert">{error.message}</FormMessage>}
      <div>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </Card>
  );
}
