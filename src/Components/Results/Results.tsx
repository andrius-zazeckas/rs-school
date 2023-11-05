import React, { Component } from 'react';
import './Results.css';

interface Person {
  name: string;
  height: string;
  eye_color: string;
}
interface Props {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

interface State {
  next: string;
  previous: string;
  people: Person[];
  loading: boolean;
}

export default class Results extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      next: '',
      previous: '',
      people: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: Props) {
    const { searchValue } = this.props;
    if (searchValue !== prevProps.searchValue) {
      this.fetchData();
    }
  }

  fetchData = (apiUrl?: string) => {
    const { searchValue } = this.props;
    const url =
      apiUrl ||
      `https://swapi.dev/api/people/${
        searchValue ? `?search=${searchValue}` : ''
      }`;

    this.setState({
      loading: true,
    });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          next: data.next,
          previous: data.previous,
          people: data.results,
          loading: false,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({
          loading: false,
        });
      });
  };

  handleNextClick = () => {
    this.fetchData(this.state.next);
  };

  handlePreviousClick = () => {
    this.fetchData(this.state.previous);
  };
  render() {
    const { next, previous, people, loading } = this.state;

    return (
      <div className="results">
        <h3>Results</h3>

        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div className="pagination">
                {next && (
                  <button onClick={this.handleNextClick}>Next page</button>
                )}
                {previous && (
                  <button onClick={this.handlePreviousClick}>
                    Previous page
                  </button>
                )}
              </div>
              <div className="people">
                {people.map((person: Person) => (
                  <div className="person" key={person.name}>
                    <h3>{person.name}</h3>
                    <p>Height: {person.height}</p>
                    <p>Eye Color: {person.eye_color}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
