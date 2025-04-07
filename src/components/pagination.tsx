import { Button } from "./ui/button";

type Props = {
  activePage: number;
  count: number;
  rowsPerPage: number;
  setActivePage: (page: number) => void;
};

export function Pagination({
  activePage,
  count,
  rowsPerPage,
  setActivePage,
}: Props) {
  const totalPages = Math.ceil(count / rowsPerPage);
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div>
        <Button disabled={activePage === 1} onClick={() => setActivePage(1)}>
          ⏮️ First
        </Button>
        <Button
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}>
          ⬅️ Previous
        </Button>
        <Button
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}>
          Next ➡️
        </Button>
        <Button
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}>
          Last ⏭️
        </Button>
      </div>
      <p>
        Page {activePage} of {totalPages}
      </p>
      <p>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
    </>
  );
}
