import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <header>
      <h1>Welcome to the world of Star Wars</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
