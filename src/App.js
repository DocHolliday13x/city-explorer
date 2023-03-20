import React from 'react';
import Axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: [],
    }
  }

// ********** GET CITY DATA **********

handleGetCityData = () => {
  event.preventDefault();

  // TODO: USE AXIOS TO MAKE A CALLOUT TO THE LOCATION API
  let cityData = axios.get(URL);

  // TODO: SET THAT DATA INTO STATE

}

  render() {
    return (
      <>
      <h1>API Calls</h1>

      <form>
        <button type= 'submit' onClick= {this.handleGetCityData}>Cities</button>
      </form>
      </>
    )
  }
}



export default App;
