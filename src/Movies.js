import React from 'react';

class Movies extends React.Component {
  render() {
    return (
      <>
        {this.props.description.map((city, idx) => {
          return (
            <div key= {idx}>
              <h1>{city.original_title}</h1>
              <p>{city.overview}</p>
              <image>{city.poster_path}</image>
            </div>
          )
        })}

      </>
    )
  }
}


export default Movies;