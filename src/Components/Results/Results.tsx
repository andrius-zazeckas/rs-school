import React, { Component } from 'react';

interface Person {
  name: string;
  height: string;
  eye_color: string;
}

export default class Results extends Component {
  state: { people: Person[] } = {
    people: [],
  };

  componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    const apiUrl = searchValue
      ? `https://swapi.dev/api/people/?search=${searchValue}`
      : 'https://swapi.dev/api/people';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          people: data.results,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { people } = this.state;

    return (
      <div>
        <h3>Results</h3>

        {people.map((person) => (
          <div key={person.name}>
            <p>Name: {person.name}</p>
            <p>Height: {person.height}</p>
            <p>Eye Color: {person.eye_color}</p>
          </div>
        ))}
      </div>
    );
  }
}
