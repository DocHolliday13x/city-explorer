import React from 'react';
import Card from 'react-bootstrap/Card'
import Weather2 from './Weather2';


class Weather extends React.Component {
  render() {
    return (
      <section className='cards'>
        {this.props.weatherData.map((day, index) => {
          return (

              <Card key={index} style={{ width: '18rem' }}>
              
                <Weather2
                day={day}
                idx={index}
                />

              </Card>

          )
        })}

      </section>
    )
  }
}


export default Weather;