import useSWR from "swr";
import { getMyBets } from "../api";
import { formatCurrency } from "../utils/currency";
import { type Column, Table } from "../components/table";
import { formatDate } from "../utils/date";

const TABLE_HEADERS: Column[] = [
  {
    accessor: "createdAt",
    label: "Date/Time",
    format: (value) => formatDate(value),
  },
  {
    accessor: "amount",
    label: "Amount",
    format: (value) => formatCurrency(value),
  },
  {
    accessor: "status",
    label: "Status",
  },
  {
    accessor: "winAmount",
    label: "Prize",
    format: (value) => (value ? formatCurrency(value) : "-"),
  },
  {
    accessor: "actions",
    label: "Actions",
  },
];

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
        <Table
          columns={TABLE_HEADERS.map((header) => {
            return {
              ...header,
              format: header.format ? header.format : (value: string) => value,
            };
          })}
          rows={data.data.map((bet) => ({
            id: bet.id,
            content: {
              createdAt: bet.createdAt,
              amount: bet.amount,
              status: bet.status,
              winAmount: bet.winAmount,
              actions:
                bet.status === "cancelled" ? (
                  <button disabled>Cancelled</button>
                ) : (
                  <button onClick={() => console.log(bet.id)}>Cancel</button>
                ),
            },
          }))}
        />
      )}
    </div>
  );
}
