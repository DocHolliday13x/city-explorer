import React from 'react';
import Container from 'react-bootstrap/Container'
import Carousel from 'react-bootstrap/Carousel';
import Movie from './Movies2';

class Movies extends React.Component {
  render() {
    return (

            <Container>

              <Carousel>
                {this.props.movieData.map((movie, index) => {
                  return (
                    <Movie
                    movie={movie}
                    index={index}
                    />
                  )
                })}
              </Carousel>
              
            </Container>

    )
  }
}


export default Movies;