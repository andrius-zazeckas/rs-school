import { useState, useEffect, FC, useContext } from 'react';
import './Results.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Person } from '../Person/Person';
import { getPeopleData } from '../../api/getPeopleData';
import { SearchContext } from '../Context/SearchContext';
import { PeopleContext } from '../Context/PeopleContext';

export type TPerson = {
  name: string;
  height: string;
  eye_color: string;
};

export const Results: FC = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [next, setNext] = useState<boolean>(false);
  const [previous, setPrevious] = useState<boolean>(false);
  const { people, setPeople, personDetails, setPersonDetails } =
    useContext(PeopleContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultsCounter, setResultsCounter] = useState<number>(0);
  const [pageSize, setPageSize] = useState<string>('20');
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    setNext(false);
    setPrevious(false);
    navigate(`/`);
    setPersonDetails(null);
  }, [pageSize, navigate, setPersonDetails]);

  const savedSearchValue = localStorage.getItem('searchValue');
  useEffect(() => {
    if (savedSearchValue) {
      setSearchValue(savedSearchValue);
    }
  }, [savedSearchValue, setSearchValue]);

  const page = searchParams.get('page');

  useEffect(() => {
    const newUrl = new URL(window.location.href);
    const newSearchParams = new URLSearchParams(newUrl.search);
    if (personDetails) {
      newSearchParams.set('personDetails', JSON.stringify(personDetails.name));
    } else {
      newSearchParams.delete('personDetails');
    }
    newUrl.search = newSearchParams.toString();
    window.history.pushState({}, '', newUrl.toString());
  }, [personDetails]);

  useEffect(() => {
    getPeopleData({
      page,
      pageSize,
      searchValue,
      setLoading,
      setPeople,
      navigate,
      setNext,
      setPrevious,
      setResultsCounter,
    });
  }, [searchValue, page, pageSize, navigate, setNext, setPrevious, setPeople]);

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
            {/* {!searchValue && ( */}
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
            {/* )} */}

            <div className={personDetails ? 'people-details' : ''}>
              <div
                className="people"
                onClick={() => (personDetails ? setPersonDetails(null) : '')}
              >
                {people.map((person: TPerson) => (
                  <ul
                    className="person"
                    key={person.name}
                    onClick={() => setPersonDetails(person)}
                  >
                    <div>
                      <li className="person-name">{person.name}</li>
                      <li>Height: {person.height}</li>
                      <li>Eye Color: {person.eye_color}</li>
                    </div>
                  </ul>
                ))}
              </div>
              {personDetails && !loading && (
                <div onClick={() => setPersonDetails(null)}>
                  <Person />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
