import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import './App.css';
import Weather from './Weather'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {}, // this data comes from axios as an object
      city: '',
      cityLat: '',
      cityLong: '', 
      weatherData: [],
      error: false,
      errorMessage: ''

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
    // event.preventDefault();
    
    // TODO: USE AXIOS TO GET LOCATION DATA FROM LOCATION IQ -  using city in state
    // try this
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      
      let cityDataFromAxios = await axios.get(url);
      // console.log(cityDataFromAxios.data[0]);
  
      // TODO: SET THAT DATA THAT COMES BACK FROM AXIOS
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });
      // try fails so this takes place
    } catch (error) {
      console.log(error);
      // set state with boolean + error message
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
}

handleSubmit = async (e) => {
  e.preventDefault();

  // TODO: use axios to hit the api (backend)
  // TODO: set that info to state

  try {
    this.getCityData();
    // http://localhost:3001/weather
    let url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}`

    let weatherDataFromAxios = await axios.get(url);

    this.setState({ // HEY AUDREY THIS IS BROKEN. COMING THROUGH AS AN OBJECT
      weatherData: weatherDataFromAxios.data
    })


  } catch (error) {
    console.log(error.message);
  }

}

render() {
  return (
    <>
      <h1>API Calls</h1>

      <Form onSubmit={this.handleSubmit}>
        <Form.Label>City Explorer</Form.Label>
        <Form.Control type="text" placeholder="Enter Location" onChange={this.handleCityInput} />
        <Button type="submit" variant="secondary">Explore!</Button>
      </Form>

      {
        this.state.error
          ? <p>{this.state.errorMessage}</p>
          : Object.keys(this.state.cityData).length > 0 &&
          <ul>
            <p>{this.state.cityData.display_name}</p>
            <p>{this.state.cityData.lat}</p>
            <p>{this.state.cityData.lon}</p>
            <Weather description={this.state.weatherData}/>
            <Image className="img-fluid" src= {`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='Map of selected location'/>
          </ul>
      }

    </>
  )
}
}



export default App;
