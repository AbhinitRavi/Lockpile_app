import React, {Component} from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class  MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {showingInfoWindow: false,  selectedPlace: {}, showingInfoWindow: false}
    }

    componentDidMount() {
        //console.log('props,' ,this.props);
    }
    handleClickMarker() {
        console.log('click happened');
        this.props.clickAction();
    }

    onMarkerClick = (props, marker, e) => {
       this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
       })
    }
        

    displayMarkers = () => {
        return this.props.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.lat,
                lng: store.lng
            }}
            name={store.name}
            icon={store.availability? "http://maps.google.com/mapfiles/ms/icons/green-dot.png":''}
            onClick={this.onMarkerClick}
            />

        })
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={10}
                className="Map"
                initialCenter={{lat: 51.50, lng: -0.09}}
            >
                {this.displayMarkers()}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                        <div className="resContainer" >
                            <div className="imgHolder">
                                <img className="infoWindowImg" src={"./locker-placeholder.png"} />
                            </div>
                            <div className="reserveDesc">
                                <button className="btn btn-primary ">Reserve Now For £4.00</button>
                            </div>
                        </div>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCyYaTMMeYQnYXv41xlUs-GsRe4S_lCG7k'
})(MapContainer);
