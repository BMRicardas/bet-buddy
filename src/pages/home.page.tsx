import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatCurrency } from "../utils/currency";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { placeBet } from "../api/queries";
import { useUserContext } from "../contexts/user/use-user-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const betFormSchema = z.object({
  ammount: z
    .string()
    .min(1, "Please enter a bet amount")
    .refine(
      (value) => {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 1;
      },
      {
        message: "Minimum bet amount is €1.00",
      }
    ),
});

type BetFormValues = z.infer<typeof betFormSchema>;

export function HomePage() {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: placeBet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bets"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const form = useForm<BetFormValues>({
    defaultValues: {
      ammount: "",
    },
    resolver: zodResolver(
      betFormSchema.refine(
        (data) => {
          const amount = Number(data.ammount);
          return !user || amount <= user.balance;
        },
        {
          message: "Bet amount cannot exceed your balance",
          path: ["amount"],
        }
      )
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<BetFormValues> = async (data) => {
    const amount = Number(data.ammount);
    mutate({ amount });
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <h2>Place your bet</h2>
      <p>Your balance: {formatCurrency(user.balance)}</p>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel htmlFor="ammount">Bet Amount:</FormLabel>
            <Input type="number" id="ammount" {...register("ammount")} />
            {errors.ammount && (
              <FormMessage role="alert">{errors.ammount.message}</FormMessage>
            )}
          </FormItem>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Placing bet..." : "Place Bet"}
          </Button>
        </form>
      </Form>
      <Link to="/bets">View Betting History</Link>
    </div>
  );
}
