import React from 'react';


class Movie extends React.Component {
  render() {
    return (
      <>
      <p>{this.props.movie.title}</p>
      <p>{this.props.movie.overview}</p>
      </>
    )
  }
}

export default Movie;