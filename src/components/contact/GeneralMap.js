import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import React, { Fragment } from 'react';
const containerStyle = {
    width: "100%",
    height: "90vh"
  };
  
  const center = {
    lat: 48.7127, lng: 2.2945
  };
const GeneralMap = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyAYzby4yYDVaXPmtu4jZAGR258K6IYwjIY&libraries"
      })
  return (
<Fragment>
  <div>
      {isLoaded ? (
              <GoogleMap center={center} zoom={13} mapContainerStyle={containerStyle} options={{
                zoomControl:true,
                streetViewControl:false,
                mapTypeControl:false,
                fullscreenControl: false,
              }}>
                <MarkerF position={center}/>
              </GoogleMap>
      ): null}
    </div>
</Fragment>
  )
}

export default GeneralMap
