type TProps = {
  next: boolean;
  previous: boolean;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
};

export const Pagination = ({
  next,
  previous,
  handlePreviousClick,
  handleNextClick,
}: TProps) => {
  return (
    <div className="pagination">
      <button disabled={!previous} onClick={handlePreviousClick}>
        Previous page
      </button>

      <button disabled={!next} onClick={handleNextClick}>
        Next page
      </button>
    </div>
  );
};
