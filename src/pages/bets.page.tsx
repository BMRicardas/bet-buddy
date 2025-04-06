import useSWR from "swr";
import { getMyBets } from "../api";
import { formatCurrency } from "../utils/currency";

export function BetsPage() {
  const key = ["/my-bets"];

  const { data, error, isLoading } = useSWR(key, () =>
    getMyBets({ page: 1, limit: 10 })
  );

  console.log({ data });

  return (
    <div>
      <h1>My Betting History</h1>
      <p>Here you can view your betting history.</p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading bets: {error.message}</p>}
      {data && data.data.length === 0 && <p>No bets found.</p>}
      {data && data.data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Prize</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((bet) => (
              <tr key={bet.id}>
                <td>{new Date(bet.createdAt).toLocaleDateString()}</td>
                <td>{bet.amount}</td>
                <td>{bet.status}</td>
                <td>{bet.winAmount ? formatCurrency(bet.winAmount) : "-"}</td>
                <td>
                  {bet.status === "cancelled" ? (
                    <button disabled>Cancelled</button>
                  ) : (
                    <button onClick={() => console.log(bet.id)}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
