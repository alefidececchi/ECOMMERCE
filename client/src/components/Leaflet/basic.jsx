import React, { useRef, useState } from "react";
import Footer from "../Footer/footer";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import L from "leaflet";
import osm from "./osm-providers";
import stores from "./stores.json";
//import "leaflet/dist/leaflet.css";
import useGeoLocation from "./useGeoLocation";
import "./index.css";
import "leaflet-draw/dist/leaflet.draw.css"

const markerIcon = new L.Icon({
    iconUrl: require("./resources/images/marker.png"),
    iconSize: [35, 45],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46]
});

const Leaflet = () => {
    const [center, setCenter] = useState({ lat: -13.360486, lng: -70.661781 });
    const [mapLayers, setMapLayers] = useState([]);
    let ZOOM_LEVEL = 4;
    const mapRef = useRef()
    const location = useGeoLocation();
    const showMyLocation = () => {
        if (location.loaded && !location.error) {
            //console.log(mapRef.current)
            mapRef.current.flyTo(
                [location.coordinates.lat, location.coordinates.lng],
                ZOOM_LEVEL = 14,
                { animate: true }
            );
        } else {
            alert(location.error.message)
        }
    };
    const _onCreate = (e) => {
        console.log(e);
        const { layerType, layer } = e;
        if (layerType === "polygon") {
            const { _leaflet_id } = layer;

            setMapLayers((layers) => [
                ...layers,
                { id: _leaflet_id, latlngs: layer.getLatLngs()[0] }
            ]);
        }
    }
    const _onEdited = (e) => {
        console.log(e);
    };
    const _onDeleted = (e) => {
        console.log(e);
    }
    return (
        <div className="container">
            <div className="double" >
                <div className="rows">
                    <div className="ubicacionesHTML">
                        <h3>Physical Stores </h3>
                    </div>
                    <div >
                        {stores.map((f) => <div className="ubicaciones" > <h4>{f.name}</h4></div>)}
                    </div>
                    <div className="col d-flex justify-content-center">
                        <button
                            className="btn"
                            onClick={showMyLocation}>
                            Locate Me
                        </button>
                    </div>

                </div>
                <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                    <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}></TileLayer>
                    {stores.map((store) =>
                        <Marker position={[store.lat, store.lng]} icon={markerIcon} key={store.key}>
                            <Popup><b>{store.name}</b></Popup>
                        </Marker>
                    )}
                    {location.loaded && !location.error && (
                        <Marker icon={markerIcon}
                            position={[
                                location.coordinates.lat, location.coordinates.lng]}>
                            <Popup><b>Mi ubicación actual por GPS</b></Popup>
                        </Marker>)}
                    <FeatureGroup>
                        <EditControl position="topright"
                            onCreated={_onCreate}
                            onEdited={_onEdited}
                            onDeleted={_onDeleted}
                            draw={{
                                rectangle: false,
                                polyline: false,
                                circle: false,
                                circlemarker: false,
                                marker: false,
                            }}>
                        </EditControl>
                    </FeatureGroup>
                </MapContainer>
            </div>
            <Footer />
        </div>
    )
}

export default Leaflet;
