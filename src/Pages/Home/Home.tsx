import { FC, useState } from 'react';
import { Search } from '../../Components/Search/Search';
import { Results } from '../../Components/Results/Results';

type HomeProps = object;

export const Home: FC<HomeProps> = () => {
  const [error, setError] = useState(false);

  const throwNewError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('Lets test the error boundary');
  }

  return (
    <div className="wrapper">
      <button onClick={throwNewError}>Error test button</button>
      <Search />
      <Results />
    </div>
  );
};
