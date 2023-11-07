import { TPerson } from '../Components/Results/Results';

export type PeopleDataType = {
  page: string | null;
  pageSize: string | null;
  searchValue: string;
  setLoading: (value: boolean) => void;
  setPeople: (value: TPerson[]) => void;
  navigate: (value: string) => void;
  setNext: (value: boolean) => void;
  setPrevious: (value: boolean) => void;
  setResultsCounter: (value: number) => void;
};
