import React, {Component} from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '70%',
};

class  MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stores: [{lat: 51.5225733, lng: -0.1630078},
                {latitude: 51.5225733, longitude: -0.1630078}]
        }
    }

    componentDidMount() {
    }
    handleClickMarker() {
        console.log('click happened');
        this.props.clickAction();
    }
    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
            onClick={() => this.props.clickAction()} />
        })
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={{lat: 51.50, lng: -0.09}}
            >
        {this.displayMarkers()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCyYaTMMeYQnYXv41xlUs-GsRe4S_lCG7k'
})(MapContainer);