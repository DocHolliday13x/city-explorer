import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
    }
  }


// ********** async/await - handle our asynchronous code **********
// async is a labeler 


// ********** GET CITY DATA **********

handleGetCityData = async (event) => {
  event.preventDefault();

  // TODO: USE AXIOS TO MAKE A CALLOUT TO THE LOCATION API
  let cityData = await axios.get(URL);

  // TODO: SET THAT DATA INTO STATE

  this.setState({
    cityData: cityData.data.results
  });

}

  render() {
    return (
      <>
      <h1>API Calls</h1>

      <form>
        <button type= 'submit' onClick= {this.handleGetCityData}>Cities</button>
      </form>

      <ul>
        {this.state.cityData.map((cityData, idx) => <li key={idx}>{city.name}</li>)}
      </ul>
      </>
    )
  }
}



export default App;
