import React from "react";
import "./Card.css";
import mapImage from "./map.png";
const Card = ({ ride }) => {
  // console.log(ride);

  return (
    <div className="cardContainer">
      <div className="cardImage">
        <img src={mapImage} alt="mapImage" />
      </div>
      <div className="cardDetails">
        <div>
          Ride Id: <p>{ride?.id}</p>
        </div>
        <div>
          Original Station : <p>{ride?.origin_station_code}</p>
        </div>
        <div>
          station Path:{" "}
          {ride && ride.station_path.map((code) => <p>{code},</p>)}
        </div>
        <div>
          {" "}
          Date : <p>{ride?.date}</p>
        </div>
        <div>
          {" "}
          Distance : <p>{ride?.distance}</p>
        </div>
        {/* <p> Station Destination{ride.destination_station_code}</p> */}
      </div>
      <div className="cardPlaces">
        <p>{ride?.city}</p>
        <p>{ride?.state}</p>
      </div>
    </div>
  );
};

export default Card;
