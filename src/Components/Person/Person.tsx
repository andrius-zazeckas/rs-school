import { useContext } from 'react';
import { PeopleContext } from '../Context/PeopleContext';

export const Person = () => {
  const { personDetails, setPersonDetails } = useContext(PeopleContext);

  return (
    <>
      {personDetails && (
        <div className="person-details" onClick={() => setPersonDetails(null)}>
          <button
            className="close-button"
            onClick={() => setPersonDetails(null)}
          >
            Close
          </button>
          <p>Name: {personDetails?.name}</p>
          <p>Height: {personDetails?.height}</p>
          <p>Eye Color: {personDetails?.eye_color}</p>
        </div>
      )}
    </>
  );
};
