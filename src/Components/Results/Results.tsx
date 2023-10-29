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
}

export default class Results extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      next: '',
      previous: '',
      people: [],
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

  fetchData = () => {
    const { searchValue } = this.props;
    const apiUrl = `https://swapi.dev/api/people/${
      searchValue ? `?search=${searchValue}` : ''
    }`;

    console.log(apiUrl);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          next: data.next,
          previous: data.previous,
          people: data.results,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  render() {
    const { people } = this.state;
    const { next, previous } = this.state;

    return (
      <div className="results">
        <h3>Results</h3>
        {next && <button onClick={this.fetchData}>Next</button>}
        {previous && <button onClick={this.fetchData}>Previous</button>}
        <div className="people">
          {people.map((person) => (
            <div className="person" key={person.name}>
              <h3>{person.name}</h3>
              <p>Height: {person.height}</p>
              <p>Eye Color: {person.eye_color}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
