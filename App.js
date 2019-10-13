import React, {Component} from 'react';
import MapContainer from './Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {ReserveContainer} from './Reserve'
import {OpenContainer} from './Open';
import {CurrentContainer} from './Current'
import logo from './logo.jpeg';

const client = new WebSocket('ws://ec2-3-248-207-105.eu-west-1.compute.amazonaws.com:9991');
client.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected')
}

// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const LockerStyles = {
    position: 'absolute',
    top: '620px',
    left: '20px'
};
const imgStyle = {
    width: '100%'
}

const ReservationStyles = {
    position: 'absolute',
    top: '300px',
    left: '20px'
};

class  App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      appName:'',
        showModal: false,
        optionToOpen: false,
        assetLocation: 'Marylebone',
        lockerId: false
    }
  }

    ReserveContainer = () => {

        this.setState({optionToOpen: true});
        this.setState({showModal: false});
        {var tempLockerId = this.getRandomInt(4)+1};
        this.setState({lockerId: tempLockerId});
        this.setState({optionToOpen: true});
        console.log('inside ReserveContainer; locker reserved is -' +this.state.lockerId+'!');
    }

    openLock = () => {
        console.log('inside Open Lock');
        this.setState({optionToOpen: false});


        var message = 'tincan,open,11,' + this.state.lockerId;
        client.send(message);
        // this.setState({showModal: !this.state.showModal});

      //call api here
    // console.log('calling api here');
    //  fetch(`https://us1dljnxt9.execute-api.eu-west-1.amazonaws.com/POC/triggerEvent?LockerId=233`,{mode:'no-cors',})
    //      .then((response) => response.text())
    //      .then((responseText) => {
    //          console.log(JSON.parse(responseText));
    //      })
    //      .catch(error=> {
    //          console.log('something went wrong...please check api call');
    //      })
    }

    hideOpenContainer = () => {
        this.setState({optionToOpen: false})
    }

    displayOpenContainer = () => {
        this.setState({optionToOpen: true})
    }

    handleMarkerClicked = () => {
        this.setState({showModal: !this.state.showModal});
      //
      // var infoBox = new Map.InfoWindow();
      //
      // this.setState({showOptions: true});
      // console.log('parent func called', this.state.showOptions);
      // return function() {
      //     infoBox.setContent('wwww');
      //     infoBox.open(Map, Marker);
      //     console.log(infoBox);
      // }

      //https://us1dljnxt9.execute-api.eu-west-1.amazonaws.com/POC/triggerEvent?LockerId=23

      /*fetch(`http://ec2-3-248-207-105.eu-west-1.compute.amazonaws.com/`,{mode:'no-cors',})
          // .then(response=>response.json())
          // .then(username => console.log(this.state.showOptions))
          .then((response) => response.text())
          .then((responseText) => {
              console.log(JSON.parse(responseText));
          })
          .catch((error) => {
              console.log("reset client error-------"+error);
          });

       */
    }
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }




    render() {

          return (
              <div className="App">

                  <div className="App-header">
                      <img src={logo} style={imgStyle} alt="logo" />
                  </div>
                  <div className="container">
                      <div className="row">

                              <MapContainer
                                  google={this.props.google}
                                  zoom={8}
                                  initialCenter={{ lat: 47.444, lng: -122.176}}
                                  clickAction={this.handleMarkerClicked}
                              >

                              </MapContainer>

                      </div>
                          <div className="Reservation" style={ReservationStyles}>
                              { this.state.showModal ? <ReserveContainer ReserveContainer={this.ReserveContainer} clickAction={this.displayOpenContainer} />:<CurrentContainer />}

                              {console.log('inside ReserveContainer-' +this.state.lockerId+'!')}
                          </div>

                          <div className="Locker" style={LockerStyles}>
                              { this.state.optionToOpen ? <OpenContainer lockerId={this.state.lockerId} openLock={this.openLock} clickAction={this.hideOpenContainer} /> : <CurrentContainer />}
                          </div>
                  </div>


              </div>

          );

  }
}
export default App;
