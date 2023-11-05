import { useState, useEffect, useCallback, FC } from 'react';
import './Results.css';
import { useLocation, useNavigate } from 'react-router-dom';

type Person = {
  name: string;
  height: string;
  eye_color: string;
};

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export const Results: FC<Props> = ({ searchValue }) => {
  const [next, setNext] = useState<boolean>(false);
  const [previous, setPrevious] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultsCounter, setResultsCounter] = useState<number>(0);
  const [pageSize, setPageSize] = useState<string>('20');
  const [page, setPage] = useState<string>('0');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setNext(false);
    setPrevious(false);
    setPage('0');
  }, [pageSize, searchValue]);

  const fetchData = useCallback(() => {
    const api = `https://belka.romakhin.ru/api/v1/rsschoolapi${
      pageSize ? `?page_size=${pageSize}&` : ''
    }`;

    const params = new URLSearchParams(location.search);
    const page = params.get('page');

    const url = `${api}${
      searchValue ? `search.name=${searchValue}` : page ? `page=${page}` : ''
    }`;

    setLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPeople(data.results);
        setLoading(false);

        const maxPage = Math.ceil(data.total / parseInt(pageSize || '20')) - 1;
        if (parseInt(page || '0') > maxPage) {
          navigate(`?page=${maxPage}`);
        }
        const currentPage = parseInt(page || '0');
        setPage(currentPage.toString());
        setNext(true);
        setPrevious(true);

        if (currentPage === maxPage) {
          setNext(false);
        }
        if (currentPage === 0) {
          setPrevious(false);
        }

        const newUrl = new URL(window.location.href);
        const newSearchParams = new URLSearchParams(newUrl.search);

        if (searchValue !== '') {
          newSearchParams.set('search.name', searchValue);
          setResultsCounter(data.results.length);
        } else {
          newSearchParams.delete('search.name');
          setResultsCounter(data.total);
        }

        const getPageParam = url.split('page=')[1];

        if (url.includes('page')) {
          newSearchParams.set('page', getPageParam);
          newSearchParams.delete('search.name');
        }

        if (getPageParam === '0' || !getPageParam) {
          newSearchParams.delete('page');
        }

        newUrl.search = newSearchParams.toString();
        window.history.pushState({}, '', newUrl.toString());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [searchValue, location.search, pageSize, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData, searchValue, page, pageSize]);

  const handleNextClick = () => {
    const nextPage = parseInt(page) + 1;
    navigate(`?page=${nextPage}`);
  };

  const handlePreviousClick = () => {
    const previuosPage = parseInt(page) - 1;
    navigate(`?page=${previuosPage}`);
  };

  return (
    <div className="results">
      <h3>Results</h3>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div>
              <p>
                {searchValue?.length > 0
                  ? `Search query matched ${resultsCounter} results`
                  : `Total characters: ${resultsCounter}`}
              </p>
            </div>
            <div className="pagination">
              <button disabled={!next} onClick={handleNextClick}>
                Next page
              </button>

              <button disabled={!previous} onClick={handlePreviousClick}>
                Previous page
              </button>
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
            </div>

            <div className="people">
              {people.map((person: Person) => (
                <div className="person" key={person.name}>
                  <h3>{person.name}</h3>
                  <p>Height: {person.height}</p>
                  <p>Eye Color: {person.eye_color}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
