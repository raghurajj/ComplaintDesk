import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = ReactMapboxGl({
    accessToken:
    'pk.eyJ1IjoicmFnaHVyYWpqIiwiYSI6ImNrMnJpYzhzZjA2MGIzZXBkb2oxYnV2MWQifQ.1PinwGk6Y3P0q-l7SXkfWg'
  });

class LocationPicker extends Component {
    

    _onClickMap(map, evt) {
        console.log(evt.lngLat);
      }

   render() {

   return(
    <div>
       <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '50vh',
                width: '50vw'
            }}
            center={[80.94615925,26.8467088]}
            zoom={[9]}
            onClick={this._onClickMap}
            />
    </div>
   );
   }
};
export default LocationPicker;