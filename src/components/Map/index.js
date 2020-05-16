import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from 'react-geocode';

import './styles.css';

const apiKey = 'AIzaSyBf2u_ff_YPvdpnqn5oSquRG-FUOTnA3X8';

Geocode.setApiKey(apiKey);

export class MapContainer extends Component {
  state = {
    lat: '0',
    lng: '0',
  };

  async componentDidMount() {
    const response = await Geocode.fromAddress(this.props.address);
    const { lat, lng } = response.results[0].geometry.location;
    console.log(response);
    this.setState({
      lat,
      lng,
    });
  }

  render() {
    const { lat, lng } = this.state;
    console.log(this.props);
    return (
      <div style={{ height: '50vh', width: '50vh' }}>
        <Map
          containerStyle={{
            position: 'static',
            width: '100%',
            height: '100%',
          }}
          google={this.props.google}
          zoom={14}
          center={{
            lat,
            lng,
          }}
        >
          <Marker position={{ lat, lng }} name={'Current location'} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey,
})(MapContainer);
