import { Table } from "../components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelBet, getMyBets } from "../api/queries";
import { formatDate } from "../utils/date";
import { formatCurrency } from "../utils/currency";
import { capitalizeFirstLetter } from "../utils/text";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/pagination";
import { useState } from "react";

export function BetsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: cancelBet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bets"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const {
    data: bets,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bets", currentPage, pageSize],
    queryFn: () => getMyBets({ page: currentPage, limit: pageSize }),
  });

  async function handleCancelBet(id: string) {
    mutate(id);
  }

  return (
    <div>
      <h1>My Betting History</h1>
      <p>Here you can view your betting history.</p>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading bets: {error.message}</p>}
      {bets && bets.data.length === 0 && <p>No bets found.</p>}
      {bets && bets.data.length > 0 && (
        <>
          <Table
            columns={[
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
                format: (value) => capitalizeFirstLetter(value),
              },
              {
                accessor: "winAmount",
                label: "Win Amount",
                format: (value) => (value ? formatCurrency(value) : "-"),
              },
              {
                accessor: "actions",
                label: "",
              },
            ]}
            rows={bets.data.map((bet) => {
              return {
                id: bet.id,
                content: {
                  createdAt: bet.createdAt,
                  amount: bet.amount,
                  status: bet.status,
                  winAmount: bet.winAmount,
                  actions:
                    bet.status === "canceled" ? (
                      <Button disabled>Cancelled</Button>
                    ) : (
                      <Button onClick={() => handleCancelBet(bet.id)}>
                        Cancel
                      </Button>
                    ),
                },
              };
            })}
          />
          <Pagination
            activePage={currentPage}
            count={bets.total}
            rowsPerPage={pageSize}
            setActivePage={(page) => {
              setCurrentPage(page);
              queryClient.invalidateQueries({ queryKey: ["bets"] });
            }}
          />
        </>
      )}
    </div>
  );
}
