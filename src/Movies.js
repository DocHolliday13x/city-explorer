import React from 'react';
import Card from 'react-bootstrap/Card'
import Movie from './Movie';

class Movies extends React.Component {
  render() {
    return (
      <div>
        {this.props.moviesData.map(movie => {<Movie movie={movie}/>}
          return (

            <Card key= {index} style= {{ width: '18rem'}}>
              <Card.Img variant="top" src={city.poster_path} />
              <Card.Body>

                <Card.Title>{city.title}</Card.Title>
                <Card.Text>{city.overview}</Card.Text>

              </Card.Body>

            </Card>

          )
        })}

      </div>
    )
  }
}


export default Movies;