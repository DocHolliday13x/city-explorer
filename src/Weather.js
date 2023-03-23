import React from 'react';


class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.description.map((day, idx) => {
          return (
            <div key= {idx}>
              <h1>{day.date}</h1>
              <p>{day.description}</p>
            </div>
          )
        })}

      </>
    )
  }
}


export default Weather;