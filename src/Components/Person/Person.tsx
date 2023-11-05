import type { TPerson } from '../Results/Results';

export const Person = ({ personDetails }: { personDetails: TPerson }) => {
  return (
    <div className="person-details">
      <p>Name: {personDetails.name}</p>
      <p>Height: {personDetails.height}</p>
      <p>Eye Color: {personDetails.eye_color}</p>
    </div>
  );
};
