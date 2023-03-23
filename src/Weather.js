import React from 'react';
import Card from 'react-bootstrap/Card'


class Weather extends React.Component {
  render() {
    return (
      <div>
        {this.props.description.map((day, idx) => {
          return (
            
            <Card key= {idx} style= {{ width: '18rem'}}>
              <Card.Body>

                <Card.Title>{day.date}</Card.Title>
                <Card.Text>{day.description}</Card.Text>

              </Card.Body>

            </Card>
          )
        })}

      </div>
    )
  }
}


export default Weather;