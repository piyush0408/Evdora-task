import React, { useEffect, useState } from "react";
// import { useState } from "react/cjs/react.production.min";
import Header from "./components/Header";
import "./Home.css";
import Card from "./components/Card";
import { BsFilterRight } from "react-icons/bs";

const user = {
  station_code: 42,
  name: "Kermit Michael",
  url: "https://picsum.photos/200",
};
let isLoaded = false;
let placesList = [];
let globalRides = [];

const Home = () => {
  const [rides, setRides] = useState([]);
  const [currentState, setCurrentState] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [line, setLine] = useState(1);
  const [display, setDisplay] = useState(false);
  const [nearestRides, setNearestRides] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);

  const filterPlacesFunc = (state, city = "") => {
    let filterPlace = [];
    setRides(globalRides);
    console.log("rides", rides);
    console.log(city, state);
    for (let i = 0; i < rides.length; ++i) {
      console.log(i, rides[i].state);
      if (rides[i].state === state) {
        console.log("in state if");
        if (city.length > 0) {
          if (rides[i].city === city) {
            console.log("in city if");
            filterPlace.push(rides[i]);
          }
        } else {
          console.log("in else condition");
          filterPlace.push(rides[i]);
        }
      }
    }
    console.log(filterPlace);
    setRides(filterPlace);
  };

  const nearestRidesFunc = () => {
    setRides(globalRides);

    return nearestRides;
  };

  const convertToDateObject = (stringifiedDate) => {
    const convertedDate = new Date(stringifiedDate);
    return convertedDate;
  };
  const upcomingRidesFunc = () => {
    const presentDate = new Date();
    let filterdRides = globalRides.filter((ride) => {
      const currentStringifiedDate = ride.date;
      const currentDate = convertToDateObject(currentStringifiedDate);
      return presentDate < currentDate;
    });
    setUpcomingRides(filterdRides);
    setRides(filterdRides);
  };

  const pastRidesFunc = () => {
    const presentDate = new Date();
    let filterdRides = globalRides.filter((ride) => {
      const currentStringifiedDate = ride.date;
      const currentDate = convertToDateObject(currentStringifiedDate);
      return presentDate > currentDate;
    });
    setPastRides(filterdRides);
    setRides(filterdRides);
  };
  const getIndex = (array, item, param) => {
    for (let i = 0; i < array.length; i++) {
      if (param === 0) {
        const currentState = array[i].state;
        if (item === currentState) {
          return i;
        }
      } else {
        const currentCity = array[i];
        if (item === currentCity) {
          return i;
        }
      }
    }
    return -1;
  };

  const updatePlaces = (ride) => {
    const state = ride.state;
    const city = ride.city;

    const stateIndex = getIndex(placesList, state, 0);
    if (stateIndex === -1) {
      const currentPlace = {
        state: state,
        city: [city],
      };
      placesList.push(currentPlace);
    } else {
      placesList[stateIndex].city.push(city);
    }
  };

  const loadRides = (rides) => {
    if (rides.length !== 0) {
      // console.log("rides", rides);
      const r = rides.map((ride) => {
        let distance = Math.abs(ride?.station_path[0] - user?.station_code);
        for (let i = 0; i < ride?.station_path.length; ++i) {
          if (distance > Math.abs(ride?.station_path[i] - user?.station_code))
            distance = Math.abs(ride?.station_path[i] - user?.station_code);
        }

        updatePlaces(ride);

        const newRide = { ...ride, distance };
        // console.log("newride:", newRide);

        return newRide;
      });

      // console.log("r2", r);
      // setRides(r);
      function compare(a, b) {
        if (a.distance > b.distance) return 1;
        if (a.distance < b.distance) return -1;
        return 0;
      }
      r.sort(compare);
      globalRides = r;
      setNearestRides(r);
      setRides(r);
      return r;
      // console.log("r3", nearestRides);
    }
    return;
  };

  useEffect(() => {
    if (!isLoaded) {
      const getRides = async () => {
        await fetch("https://assessment.api.vweb.app/rides", {
          method: "GET",
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((ri) => {
            setRides(ri);
            loadRides(ri);
          })
          .catch((error) => console.log(error));
      };

      getRides();
    }
    return () => {
      isLoaded = true;
    };
  });

  const findCity = (array, item) => {
    let x;
    for (let index = 0; index < array.length; ++index) {
      if (array[index].state === item) {
        x = array[index].city;
      }
    }
    return x;
  };

  return (
    <div className="homeContainer">
      <Header />
      <div className="homeMain">
        <div className="homeFilters">
          <div className="rides">
            <button
              className="shown"
              onClick={() => {
                nearestRidesFunc();
                setLine(1);
                console.log(line);
              }}
            >
              Nearest Ride({globalRides.length})
            </button>

            <button
              className={line === 2 ? "shown" : "hide"}
              onClick={() => {
                upcomingRidesFunc();
                setLine(2);
                console.log(line);
              }}
            >
              Upcoming Rides({upcomingRides.length})
            </button>

            <button
              className={line === 3 ? "show" : "hide"}
              onClick={() => {
                pastRidesFunc();
                setLine(3);
                console.log(line);
              }}
            >
              Past Rides({pastRides.length})
            </button>
          </div>
          <div className="filter">
            {!display ? (
              <button className="filterButton" onClick={() => setDisplay(true)}>
                <BsFilterRight className="filterIcon" />
                Filters
              </button>
            ) : (
              <div className="filterDropdown">
                <button className="filterButton">
                  <div
                    className="filterDropdownHeader"
                    onClick={() => setDisplay(false)}
                  >
                    Filters
                  </div>
                </button>
                <select
                  className="select"
                  defaultValue="State"
                  onChange={(e) => {
                    setCurrentState(e.target.value);
                    filterPlacesFunc(e.target.value);

                    console.log(e.target.value);
                  }}
                >
                  {placesList?.map((place, i) => (
                    <option
                      key={i}
                      value={place.state}
                      className="selectOption"
                    >
                      {place.state}
                    </option>
                  ))}
                </select>

                {currentState && (
                  <select
                    className="select"
                    onChange={(e) => {
                      setDisplay(false);
                      setCurrentCity(e.target.value);
                      filterPlacesFunc(currentState, e.target.value);
                    }}
                  >
                    {findCity(placesList, currentState).map((c, i) => (
                      <option key={i} value={c} className="selectOption">
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
        </div>

        {rides &&
          rides.map((ride, i) => {
            return <Card key={i} ride={ride} user={user} />;
          })}
      </div>
    </div>
  );
};

export default Home;
