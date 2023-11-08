import { createContext } from 'react';
import { TPerson } from '../Results/Results';

export type TPeopleContext = {
  people: TPerson[];
  setPeople: (value: TPerson[]) => void;
  personDetails: TPerson | null;
  setPersonDetails: (value: TPerson | null) => void;
};

export const PeopleContext = createContext<TPeopleContext>({
  people: [],
  setPeople: () => {},
  personDetails: null,
  setPersonDetails: () => {},
});
