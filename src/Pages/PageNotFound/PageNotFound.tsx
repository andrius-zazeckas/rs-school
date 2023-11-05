import { Link } from 'react-router-dom';

export const PageNotFound = () => {
  return (
    <div className="wrapper">
      <h2>Page not found</h2>
      <Link to="/">Go to the home page</Link>
    </div>
  );
};
