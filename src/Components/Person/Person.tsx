import type { TPerson } from '../Results/Results';

export const Person = ({
  personDetails,
  setPersonDetails,
}: {
  personDetails: TPerson;
  setPersonDetails: (value: TPerson | null) => void;
}) => {
  return (
    <div className="person-details">
      <button onClick={() => setPersonDetails(null)}>Close</button>
      <p>Name: {personDetails.name}</p>
      <p>Height: {personDetails.height}</p>
      <p>Eye Color: {personDetails.eye_color}</p>
    </div>
  );
};
