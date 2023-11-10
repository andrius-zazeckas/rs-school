import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../Layout/Layout';
import { Home } from '../../Pages/Home/Home';
import { PageNotFound } from '../../Pages/PageNotFound/PageNotFound';
import ErrorPage from '../ErrorPage/ErrorPage';

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="error" element={<ErrorPage />} />
          <Route index element={<Home />} />
          {/* <Route path="results" element={<Results />}>
            <Route path="personDetails" element={<Person />} />
          </Route> */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
