import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityLocationData: [],
      city: '',
      cityLat: '',
      cityLong: '',
      cityData: {}, // this data comes from axios as an object
      error: false,
      errorMessage: ''

    }
  }

  handleCityInput = async (event) => {
    this.setState({
      city: event.target.value
    })
  }
  // ********** async/await - handle our asynchronous code **********
  // async is a labeler 
  getCityData = async (event) => {
    event.preventDefault();
    

}


  // ********** GET CITY DATA **********


  // TODO: USE AXIOS TO GET LOCATION DATA FROM LOCATION IQ -  using city in state


  // TODO: SET THAT DATA THAT COMES BACK FROM AXIOS



render() {
  return (
    <>
      <h1>API Calls</h1>

      <Form onSubmit={this.getCityData}>
        <Form.Label>City Explorer</Form.Label>
        <Form.Control type="text" placeholder="Enter Location" onChange={this.handleCityInput} />
        <Button type="submit" variant="info">Explore!</Button>
      </Form>

      {
        this.state.error
          ? <p>this.state.errorMessage}</p>
          : Object.keys(this.state.cityData).length > 0 &&
          <ul>
            <p>{this.state.cityData.display_name}</p>
            <p>{this.state.cityData.lat}</p>
            <p>{this.state.cityData.lon}</p>
            
          </ul>
      }


    </>
  )
}
}



export default App;
