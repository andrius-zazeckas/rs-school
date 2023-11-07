import { PeopleDataType } from './types';

export const getPeopleData = ({
  page,
  pageSize,
  searchValue,
  setLoading,
  setPeople,
  navigate,
  setNext,
  setPrevious,
  setResultsCounter,
}: PeopleDataType) => {
  const api = `https://belka.romakhin.ru/api/v1/rsschoolapi${
    pageSize ? `?page_size=${pageSize}&` : ''
  }`;

  const url = `${api}${
    searchValue ? `search.name=${searchValue}` : page ? `page=${page}` : ''
  }`;

  setLoading(true);

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setPeople(data.results);
      setLoading(false);

      const maxPage = Math.ceil(data.total / parseInt(pageSize || '20')) - 1;
      if (parseInt(page || '0') > maxPage) {
        navigate(`?page=${maxPage}`);
      }
      const currentPage = parseInt(page || '0');

      setNext(true);
      setPrevious(true);

      if (currentPage === maxPage) {
        setNext(false);
      }
      if (currentPage === 0) {
        setPrevious(false);
      }

      const newUrl = new URL(window.location.href);
      const newSearchParams = new URLSearchParams(newUrl.search);

      if (searchValue !== '') {
        newSearchParams.set('search.name', searchValue);
        navigate(`?search.name=${searchValue}`);
        setResultsCounter(data.results.length);
      } else {
        newSearchParams.delete('search.name');
        setResultsCounter(data.total);
      }

      if (page === '0' || !page) {
        newSearchParams.delete('page');
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
};
