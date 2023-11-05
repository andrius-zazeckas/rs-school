import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Home } from '../../Pages/Home/Home';
import { PageNotFound } from '../../Pages/PageNotFound/PageNotFound';

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
