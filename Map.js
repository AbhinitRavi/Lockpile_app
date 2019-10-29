import React, {Component} from "react";
import ReactDOM from "react-dom";

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Box } from './Box'
import { ModalDiag } from './Modal'

class  MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            selectedPlace: {}, 
            showingInfoWindow: false,
            myLockers: [],
            stores: props.stores,
            showModal: false,
            selectedLocker: null
        }
    }

    componentDidMount() {
    }
    handleClickMarker() {
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
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.lat,
                lng: store.lng
            }}
            name={store.name}
            cost ={store.cost}
            reservedTime = {store.reservedTime}
            availability = {store.availability}
            icon={store.availability? "http://maps.google.com/mapfiles/ms/icons/green-dot.png":''}
            onClick={this.onMarkerClick}
            />

        })
    }
    handleOnClickBut = lockerP => {
        const locker = {...lockerP, reservedTime:new Date()};
        const newLockers = [...this.state.myLockers, locker];
        if (this.state.myLockers.length < 4) {
            const getIndex = this.state.stores.findIndex(item => item.name === locker.name)
            this.state.stores[getIndex].availability = false
            this.setState({myLockers: newLockers, selectedLocker: this.state.stores[getIndex] });
        }
    }
    onInfoWindowOpen(props, e) {
        const button = (
            <div>
                <h4>{this.state.selectedPlace.name}</h4>
                <div className="resContainer" >
                    <div className="imgHolder">
                        <img className="infoWindowImg" src={"./locker-placeholder.png"} />
                    </div>
                    <div className="reserveDesc" >
                        {this.state.selectedPlace.availability?<div className="btn btn-primary "  onClick={()=>this.handleOnClickBut(this.state.selectedPlace)}>Reserve Now For {this.state.selectedPlace.cost}</div>:<strong>Reserved</strong>}
                    </div>
                </div>
             </div>
 
        );
        ReactDOM.render(
          React.Children.only(button),
          document.getElementById("iwc")
        );
    }
    showModalBox = locker => {
        console.log('showmodal box called', locker);

        this.setState({selectedLocker: locker, showModal: true})
    }
    closeModalBox = () => {
        console.log('showmodal box hidden');

        this.setState({showModal: false})
    }
    render() {
        return (
        <div>
            <Map
                google={this.props.google}
                zoom={10}
                className="Map"
                initialCenter={{lat: 51.50, lng: -0.09}}
            >
                {this.displayMarkers()}
                
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onOpen={e => {
                    this.onInfoWindowOpen(this.props, e);
                    }}
                >
                    <div id="iwc" />
                </InfoWindow>
                
            </Map>
            <div className="container boxCont">
            <div className="row">
              <div className="col-sm-6" onClick={()=>this.showModalBox(this.state.myLockers[0])}>
                <Box locker={this.state.myLockers[0]} className="yellow" />
              </div>
              <div className=" col-sm-6" onClick={()=>this.showModalBox(this.state.myLockers[0])}>
                <Box locker={this.state.myLockers[1]} className="yellow" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6" onClick={()=>this.showModalBox(this.state.myLockers[0])}>
                <Box locker={this.state.myLockers[2]} className="green" />
              </div>
              <div className="col-sm-6"  onClick={()=>this.showModalBox(this.state.myLockers[0])}>
                <Box locker={this.state.myLockers[3]} className="green"/>
              </div>
            </div>
          </div>
          <div className="test">
            {(this.state.showModal &&this.state.selectedLocker)?
                <div className="bottomModal">
                    <span className="bottomClose" onClick={this.closeModalBox}>[X]</span>
                    <div className="bottomContent">
                        {this.state.selectedLocker.name} with ID {this.state.selectedLocker.id } was reserved for {this.state.selectedLocker.cost} 
                        at [{this.state.selectedLocker.reservedTime.getDate() + '/' + this.state.selectedLocker.reservedTime.getMonth()+ '/' + 
                        this.state.selectedLocker.reservedTime.getFullYear() + ' ' + this.state.selectedLocker.reservedTime.getHours() + ':' + 
                        this.state.selectedLocker.reservedTime.getMinutes()}
                        ]
                    </div>
                    <div className="bottomButtons">
                        <button className="btn btn-primary">Open</button>
                    </div>
                </div>:''}
          </div>
        </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCyYaTMMeYQnYXv41xlUs-GsRe4S_lCG7k'
})(MapContainer);
