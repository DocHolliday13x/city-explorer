import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather2 extends React.Component {
  render() {
    const {day} = this.props;
    return (
      <Card.Body>

        <Card.Title>{day.date}</Card.Title>
        <Card.Text>{day.description}</Card.Text>

      </Card.Body>
    )
  }
}


export default Weather2;