import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import './App.css';
import Weather from './Weather';
import Movies from './Movies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {}, // this data comes from axios as an object
      city: '',
      // cityLat: '',
      // cityLong: '',
      weatherData: [],
      moviesData: [],
      error: false,
      errorMessage: '',
    }
  }

  // ********** GET CITY DATA **********

  handleCityInput = async (event) => {
    this.setState({
      city: event.target.value
    })
  }
  // ********** async/await - handle our asynchronous code **********
  // async is a labeler 
  getCityData = async (event) => {
    event.preventDefault();

    // TODO: USE AXIOS TO GET LOCATION DATA FROM LOCATION IQ -  using city in state
    // try this
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);
      // console.log(cityDataFromAxios.data[0]);
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      this.handleGetWeather(lat, lon);

      // let movieTitle = cityDataFromAxios.data.orignial_title;
      // let movieDescription = cityDataFromAxios.data.overview;
      this.handleGetMovies();

      // TODO: SET THAT DATA THAT COMES BACK FROM AXIOS

      // try fails so this takes place
    } catch (error) {
      console.log(error);
      // set state with boolean + error message
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  };


  handleGetWeather = async (cityLat, cityLong) => {
    // e.preventDefault();
    // TODO: use axios to hit the api (backend)
    // TODO: set that info to state

    try {
      // this.getCityData();
      // http://localhost:3001/weather
      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${cityLat}&lon=${cityLong}&days=10&units=I`;

      let weatherDataFromAxios = await axios.get(url);
      // console.log(weatherDataFromAxios.data);

      this.setState({ // HEY AUDREY THIS IS BROKEN. COMING THROUGH AS AN OBJECT
        weatherData: weatherDataFromAxios.data,
        error: false
      },console.log(this.weatherData));
      

    } catch (error) {
      console.log(error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }

  };

handleGetMovies = async () => {
  try {
    let url = `${process.env.REACT_APP_MOVIEDB_API_KEY}/movies?searchQuery=${this.state.city}`

    let moviesDataFromAxios = await axios.get(url);
    console.log(moviesDataFromAxios.data);

    this.setState({
      moviesData: moviesDataFromAxios.data,
      error: false,
    });

    } catch (error) {
      console.log(error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  };




  render() {
    return (
      <>
        <h1>API Calls</h1>

        <Form onSubmit={this.getCityData}>
          <Form.Label>City Explorer</Form.Label>
          <Form.Control type="text" placeholder="Enter Location" onChange={this.handleCityInput} />
          <Button type="submit" variant="secondary">Explore!</Button>
        </Form>

        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : Object.keys(this.state.cityData).length > 0 &&
            <ul>
              <h2>{this.state.cityData.display_name}</h2>
              <p>{this.state.cityData.lat}</p>
              <p>{this.state.cityData.lon}</p>
              <Weather description={this.state.weatherData} />
              <Movies moviesData={this.state.moviesData} />
              <Image className="img-fluid" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='Map of selected location' />
            </ul>
        }

      </>
    )
  }
};




export default App;
