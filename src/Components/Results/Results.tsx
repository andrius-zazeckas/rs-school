import React, { useState, useEffect, useCallback } from 'react';
import './Results.css';

interface Person {
  name: string;
  height: string;
  eye_color: string;
}

interface Props {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export const Results: React.FC<Props> = ({ searchValue }) => {
  const [next, setNext] = useState<string>('');
  const [previous, setPrevious] = useState<string>('');
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    (apiUrl?: string) => {
      const url =
        apiUrl ||
        `https://swapi.dev/api/people/${
          searchValue ? `?search=${searchValue}` : ''
        }`;

      setLoading(true);

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setNext(data.next);
          setPrevious(data.previous);
          setPeople(data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    },
    [searchValue]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, searchValue]);

  const handleNextClick = () => {
    fetchData(next);
  };

  const handlePreviousClick = () => {
    fetchData(previous);
  };

  return (
    <div className="results">
      <h3>Results</h3>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="pagination">
              {next && <button onClick={handleNextClick}>Next page</button>}
              {previous && (
                <button onClick={handlePreviousClick}>Previous page</button>
              )}
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
