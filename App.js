import React, {Component} from 'react';
import MapContainer from './Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import logo from './logo.png';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';



const boxOptions = {
  boxClass: "box-styles", /* Applies a class to your box for styling */
  zIndex: 9999,
  boxStyle: {
    opacity: 0.75,
    width: "222px"
  },
  closeBoxMargin: "10px",
}

class  App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      appName:'',
        showModal: true,
        assets:[]
    }
  }

  componentDidMount() {
    const assets = [
        {LockerId:1, name:'Wembley Locker', img: '../public/locker-placeholder.png', lng:'-0.304841', lat:'51.550503', capacity:2, availability:false, remarks:'', cost:'30p', reservedTime:''},
        {LockerId:2, name:'Twickenham Locker', img: '../public/locker-placeholder.png', lng:'-0.3167', lat:'51.4333', capacity:3, availability: true, remarks:'', cost:'30p', reservedTime:''},
        {LockerId:3, name:'Bromley Locker', img: '../public/locker-placeholder.png', lng:'0.05', lat:'51.4', capacity:2, availability: true, remarks:'', cost:'£2.4', reservedTime:''},
        {LockerId:4, name:'Dartford Locker', img: '../public/locker-placeholder.png', lng:'0.25869', lat:'51.46513', capacity:3, availability: true, remarks:'', cost:'30p', reservedTime:''},

    ]
    this.setState({assets});
  }

  setUsername = () => {

    console.log('username changed', this.state.username);
    fetch(`https://us1dljnxt9.execute-api.eu-west-1.amazonaws.com/POC/triggerEvent?LockerId=23`)
        .then(response=>response.json())
        .then(username => console.log(this.state.username))
        .catch(error=> {
          console.log('something went wrong...pleaes check api call');
        })
  }



  handleChange = (e) => {
      this.setState({username:e.target.value})
  }

  handleMarkerClicked = () => {

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

      fetch(`http://ec2-3-248-207-105.eu-west-1.compute.amazonaws.com/`,{mode:'no-cors',})
          // .then(response=>response.json())
          // .then(username => console.log(this.state.showOptions))
          .then((response) => response.text())
          .then((responseText) => {
              console.log(JSON.parse(responseText));
          })
          .catch((error) => {
              console.log("reset client error-------"+error);
          });
  }



  render() {

          return (
              <div className="App">

                  <div className="App-header">
                      <img src={logo} className="Logi-logo"  alt="logo" />
                  </div>

                  <div className="Map">
                      <MapContainer
                          google={this.props.google}
                          zoom={8}
                          stores={this.state.assets}
                          initialCenter={{ lat: 47.444, lng: -122.176}}
                          clickAction={this.handleMarkerClicked}
                      >

                      </MapContainer>
                  </div>
                 
                

              </div>

          );

  }
}
export default App;
