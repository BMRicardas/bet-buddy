import { z } from "zod";
import { useAuth } from "../contexts/auth.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatCurrency } from "../utils/currency";
import { placeBet } from "../api";
import { useBalance } from "../contexts/balance.context";
import { Link } from "react-router";

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
  const { user } = useAuth();
  const { balance, updateBalance } = useBalance();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BetFormValues>({
    defaultValues: {
      ammount: "",
    },
    resolver: zodResolver(
      betFormSchema.refine((data) => {
        const amount = Number(data.ammount);
        return !user || amount <= balance;
      })
    ),
  });

  const onSubmit: SubmitHandler<BetFormValues> = async (data) => {
    console.log("Form submitted:", data);
    const amount = Number(data.ammount);
    try {
      const result = await placeBet({ amount });

      console.log({ betResult: result });

      updateBalance(result.balance);
    } catch (error) {
      console.error("Error placing bet:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <h2>Place your bet</h2>
      <p>Your balance: {formatCurrency(balance)}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="ammount">Bet Amount:</label>
          <input type="number" id="ammount" {...register("ammount")} />
          {errors.ammount && <span role="alert">{errors.ammount.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing bet..." : "Place Bet"}
        </button>
      </form>
      <Link to="/bets">View Betting History</Link>
    </div>
  );
}
