"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";

// Data koordinat
const MapLeaflet = ({ position = [0, 0], org = "" }) => {
    return (
        <div>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Tooltip direction="top" offset={[-15, -15]} opacity={1} permanent>
                        {org}
                    </Tooltip>
                </Marker>
            </MapContainer>
        </div>
    );
};
export default MapLeaflet;
