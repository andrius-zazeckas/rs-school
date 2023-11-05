import { useState, useEffect, useCallback, FC } from 'react';
import './Results.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Person } from '../Person/Person';

export type TPerson = {
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
  const [people, setPeople] = useState<TPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultsCounter, setResultsCounter] = useState<number>(0);
  const [pageSize, setPageSize] = useState<string>('20');
  const [personDetails, setPersonDetails] = useState<TPerson | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setNext(false);
    setPrevious(false);
    navigate(`/`);
    setPersonDetails(null);
  }, [pageSize, navigate]);

  const params = new URLSearchParams(location.search);
  const page = params.get('page');

  const fetchData = useCallback(() => {
    const api = `https://belka.romakhin.ru/api/v1/rsschoolapi${
      pageSize ? `?page_size=${pageSize}&` : ''
    }`;

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
          navigate(`?search.name=${searchValue}`);
          setResultsCounter(data.results.length);
        } else {
          newSearchParams.delete('search.name');
          setResultsCounter(data.total);
        }

        if (page === '0' || !page) {
          newSearchParams.delete('page');
        }

        if (personDetails) {
          newSearchParams.set(
            'personDetails',
            JSON.stringify(personDetails.name)
          );
        } else {
          newSearchParams.delete('personDetails');
        }
        newUrl.search = newSearchParams.toString();
        window.history.pushState({}, '', newUrl.toString());
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [searchValue, pageSize, navigate, page, personDetails]);

  useEffect(() => {
    fetchData();
  }, [fetchData, searchValue, page, pageSize]);

  const handleNextClick = () => {
    const nextPage = parseInt(page || '0') + 1;
    navigate(`?page=${nextPage}`);
  };

  const handlePreviousClick = () => {
    const previuosPage = parseInt(page || '0') - 1;
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
            {!searchValue && (
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
            )}

            <div className={personDetails ? 'people-details' : ''}>
              <div className="people">
                {people.map((person: TPerson) => (
                  <ul
                    className="person"
                    key={person.name}
                    onClick={() => setPersonDetails(person)}
                  >
                    <li>{person.name}</li>
                    {/* <p>Height: {person.height}</p> */}
                    {/* <p>Eye Color: {person.eye_color}</p> */}
                  </ul>
                ))}
              </div>
              {personDetails && (
                <div onClick={() => setPersonDetails(null)}>
                  <Person personDetails={personDetails} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
