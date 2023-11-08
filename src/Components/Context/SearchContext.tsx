import { createContext } from 'react';

export type TSearchContext = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchContext = createContext<TSearchContext>({
  searchValue: '',
  setSearchValue: () => {},
});
