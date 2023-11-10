import { PeopleDataType } from './types';

export const getPeopleData = async ({
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
  const api = 'https://belka.romakhin.ru/api/v1/rsschoolapi';
  const params = new URLSearchParams();

  if (pageSize) {
    params.append('page_size', pageSize);
  }
  if (searchValue) {
    params.append('search.name', searchValue);
  }
  if (page) {
    params.append('page', page);
  }

  const url = `${api}?${params.toString()}`;
  setLoading(true);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

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
      navigate(`?search.name=${searchValue}${page ? `&page=${page}` : ''}`);
      setResultsCounter(data.total);
    } else {
      newSearchParams.delete('search.name');
      setResultsCounter(data.total);
    }

    if (page === '0' || !page) {
      newSearchParams.delete('page');
    }

    newUrl.search = newSearchParams.toString();
    window.history.pushState({}, '', newUrl);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
    navigate('/error');
    throw new Error('Error fetching data:', { cause: error });
  }
};
