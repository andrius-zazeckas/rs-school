export const PageSize = ({
  pageSize,
  setPageSize,
}: {
  pageSize: string;
  setPageSize: (value: string) => void;
}) => {
  return (
    <div className="page-size">
      <label htmlFor="page-size">Page size:</label>
      <select
        id="page-size"
        value={pageSize}
        onChange={(e) => setPageSize(e.target.value)}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};
