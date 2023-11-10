import { useState, useEffect, FC, useContext } from 'react';
import './Results.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPeopleData } from '../../api/getPeopleData';
import { SearchContext } from '../Context/SearchContext';
import { PeopleContext } from '../Context/PeopleContext';
import { Person } from '../Person/Person';
import { Pagination } from '../Pagination/Pagination';
import { PageSize } from '../PageSize/PageSize';

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

  // useEffect(() => {
  //   setNext(false);
  //   setPrevious(false);
  //   // navigate(`/`);
  //   // setPersonDetails(null);
  // }, [pageSize]);

  const savedSearchValue = localStorage.getItem('searchValue');
  useEffect(() => {
    setPersonDetails(null);
    if (savedSearchValue) {
      setSearchValue(savedSearchValue);
    }
  }, [savedSearchValue, setSearchValue, setPersonDetails]);

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

  const handlePersonClick = (person: TPerson) => {
    setPersonDetails(person);
    // navigate(`/results/personDetails/?personDetails=${person.name}`);
  };

  return (
    <div className="results">
      <h3>Results</h3>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {people.length === 0 ? (
              <p className="no-results">No results found</p>
            ) : (
              <div>
                <div>
                  <p className="results-counter">
                    {searchValue?.length > 0
                      ? `Search query matched ${resultsCounter} results`
                      : `Total characters: ${resultsCounter}`}
                  </p>
                </div>
                <div className="pagination">
                  <Pagination
                    handleNextClick={handleNextClick}
                    handlePreviousClick={handlePreviousClick}
                    next={next}
                    previous={previous}
                  />

                  <PageSize pageSize={pageSize} setPageSize={setPageSize} />
                </div>

                <div
                  className="people-details"
                  onClick={() => (personDetails ? setPersonDetails(null) : '')}
                >
                  <div className="people">
                    {people.map((person: TPerson) => (
                      <div
                        className="person"
                        key={person.name}
                        onClick={() => handlePersonClick(person)}
                      >
                        <p className="person-name">{person.name}</p>
                        <p>Height: {person.height}</p>
                        <p>Eye Color: {person.eye_color}</p>
                      </div>
                    ))}
                  </div>
                  {loading ? <div>Loading...</div> : <Person />}
                  {/* <Outlet /> */}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
