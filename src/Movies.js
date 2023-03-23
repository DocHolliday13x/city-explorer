import React from 'react';

class Movies extends React.Component {
  render() {
    return (
      <>
        {this.props.description.map((element, idx) => {
          return (
            <div key= {idx}>
              <h1>{}</h1>
              <p>{}</p>
            </div>
          )
        })}

      </>
    )
  }
}


export default Movies;