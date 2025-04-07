import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyTransactions } from "../api/queries";
import { Table } from "../components/table";
import { Pagination } from "@/components/pagination";
import { useState } from "react";
import { capitalizeFirstLetter } from "@/utils/text";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";

export function TransactionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const queryClient = useQueryClient();
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions", currentPage, pageSize],
    queryFn: () => getMyTransactions({ page: currentPage, limit: pageSize }),
  });

  return (
    <div>
      <h1>My Transactions History</h1>
      <p>Here you can view your transaction history.</p>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading transactions: {error.message}</p>}
      {transactions && transactions.data.length === 0 && (
        <p>No transactions found.</p>
      )}
      {transactions && transactions.data.length > 0 && (
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
                accessor: "type",
                label: "Status",
                format: (value) => capitalizeFirstLetter(value),
              },
            ]}
            rows={transactions.data.map((transaction) => ({
              id: transaction.id,
              content: {
                createdAt: transaction.createdAt,
                amount: transaction.amount,
                type: transaction.type,
              },
            }))}
          />
          <Pagination
            activePage={currentPage}
            count={transactions.total}
            rowsPerPage={pageSize}
            setActivePage={(page) => {
              setCurrentPage(page);
              queryClient.invalidateQueries({ queryKey: ["transactions"] });
            }}
          />
        </>
      )}
    </div>
  );
}
