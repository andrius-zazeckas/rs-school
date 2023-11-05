import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '../Layout/Layout';
import { Home } from '../../Pages/Home/Home';
import { About } from '../../Pages/About/About';

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
