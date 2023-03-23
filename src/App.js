import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import './App.css';
import Weather from './Weather';
import Movies from './Movies';
import LocationCords from './LocationCords';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {}, // this data comes from axios as an object
      city: '',
      weatherData: [],
      moviesData: [],
      locationData: [],
      error: false,
      errorMessage: '',
    }
  }

  // ********** GET CITY DATA **********

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  // *** getCityData will get LocationIQ API info then pass it to the other APIs ***
  getCityData = async (event) => {
    event.preventDefault();


    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);
      // console.log(cityDataFromAxios.data[0]);
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

      // *** bring in getWeatherData ***
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      this.handleGetWeather(lat, lon);

      // *** bring in getMoviesData ***
      this.handleGetMovies();


    } catch (error) {
      console.log('getCityData' + error.message);

      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  };


  handleGetWeather = async (cityLat, cityLong) => {


    try {

      let url = `${process.env.REACT_APP_SERVER}/weather?lat=${cityLat}&lon=${cityLong}&days=10&units=I`;

      let weatherDataFromAxios = await axios.get(url);
      // console.log(weatherDataFromAxios.data);

      this.setState({ // HEY AUDREY THIS IS BROKEN. COMING THROUGH AS AN OBJECT
        weatherData: weatherDataFromAxios.data,
        error: false
      });


    } catch (error) {
      console.log('handleGetWeather' + error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  };

  handleGetMovies = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`

      let moviesDataFromAxios = await axios.get(url);
      console.log(moviesDataFromAxios.data);

      this.setState({
        moviesData: moviesDataFromAxios.data,
        error: false,
      });

    } catch (error) {
      console.log('handleGetMovies' + error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  };


  render() {
    return (
      <>
        <h1>Welcome, Traveler... Let's Explore!</h1>

        <Form onSubmit={this.getCityData}>
          <Form.Label>City Explorer</Form.Label>
          <Form.Control type="text" placeholder="Enter City Name" onChange={this.handleCityInput} />
          <Button type="submit" variant="secondary">Explore!</Button>
        </Form>

        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : Object.keys(this.state.cityData).length > 0 &&
            <ul>
              <h2>{this.state.cityData.display_name}</h2>
              <LocationCords
                cityData={this.state.cityData}
              />
              <Image className="img-fluid" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='Map of selected location' />
              <Weather weatherData={this.state.weatherData} />
              <Movies moviesData={this.state.moviesData} />
            </ul>
        }

      </>
    )
  }
};




export default App;
