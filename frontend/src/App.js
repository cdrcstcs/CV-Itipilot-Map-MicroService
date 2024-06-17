import "./app.css";
import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room } from "@material-ui/icons";
import axios from "axios";
import CreateAttractionPage from "./pages/Attraction";
import AttractionPage from "./pages/AttractionPage";
import { Avartar } from "./pages/avatarPage";
function App() {
  const [userData, setUserData] = useState(null);
  const [lat_cur, setLatCur] = useState(null);
  const [long_cur, setLongCur] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 4,
  });
  const [attractions, setAttractions] = useState([]);
  const [currentAttractionId, setCurrentAttractionId] = useState(null);
  const [newAttraction, setNewAttraction] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4500/userdataclient");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userData === null) {
      fetchUserData();
    }
  }, [userData]); 
  console.log(userData);
  useEffect(() => {
    const findMyCoordinates = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatCur(position.coords.latitude);
            setLongCur(position.coords.longitude);
          },
          (err) => {
            alert(err.message);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser");
      }
    };
    findMyCoordinates();
  }, []);

  useEffect(() => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: lat_cur || 0,
      longitude: long_cur || 0,
    }));
  }, [lat_cur, long_cur]);

  const handleMarkerClick = (id, long, lat) => {
    setCurrentAttractionId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewAttraction({
      lat: latitude,
      long: longitude,
    });
  };

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const allAttractions = await axios.get("http://localhost:4500/map_a");
        setAttractions(allAttractions.data); 
      } catch (err) {
        console.log(err);
      }
    };
    fetchAttractions();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={handleAddClick}
      >
        {userData && (
          <Marker
            latitude={lat_cur}
            longitude={long_cur}
            offsetLeft={-3.5 * viewport.zoom}
            offsetTop={-7 * viewport.zoom}
          >
            <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              >
              </Room>
            <Avartar imageId={userData.data.imageId} />
          </Marker>
        )}
        {attractions.map((attraction) => (
          <React.Fragment key={attraction._id}>
            <Marker
              latitude={attraction.y}
              longitude={attraction.x}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleMarkerClick(attraction._id, attraction.x, attraction.y)
                }
              />
            </Marker>
            {attraction._id === currentAttractionId && (
              <Popup
              key={attraction._id}
              latitude={attraction.y}
              longitude={attraction.x}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentAttractionId(null)}
              anchor="left"
            >
                <AttractionPage
                  attraction={attraction}
                ></AttractionPage>
              </Popup>
            )}
          </React.Fragment>
        ))}
        {newAttraction && (
          <>
            <Marker
              latitude={newAttraction.lat}
              longitude={newAttraction.long}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewport.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={newAttraction.lat}
              longitude={newAttraction.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewAttraction(null)}
              anchor="left"
            >
            <CreateAttractionPage
              x={newAttraction.long}
              y={newAttraction.lat}
            ></CreateAttractionPage>
            </Popup>
          </>
        )}
      </ReactMapGL>
    </div>
  );
}

export default App;
