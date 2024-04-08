
import React from "react";
import { Link } from "react-router-dom";
import classes from "./events.module.css";
import { Button, Group } from "@mantine/core";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from "@react-google-maps/api";
import  "./map.module.css";
import { useMemo, useState, useEffect, useRef } from "react";
import { stringify } from "@firebase/util";
import { Modal, Select, TextInput } from '@mantine/core';

const mapCoords = {"Clough Commons": {lat: 33.77508971713988, lng: -84.39645771845291}, "Campus Recreation Center": {lat: 33.775675788038406, lng: -84.40360051709634}, 
"Student Center": {lat: 33.7735349104154, lng: -84.39809670924363}, "Ferst Center for the Arts": {lat: 33.77527461165896, lng: -84.39928007795376}, 
"Price Gilbert Library": {lat: 33.7745190819366, lng: -84.39560991660518}, "Crosland Tower": {lat: 33.774288273302794, lng: -84.39506038961751}, 
"Klaus Atrium": {lat: 33.777038627378005, lng: -84.3957342446168940}, "College of Computing": {lat: 33.777957917410184, lng: -84.39735758961747}, 
"Kendeda Building": {lat: 33.778776892122, lng: -84.3995969896174}, "Exhibition Hall": {lat: 33.775073243960726, lng: -84.40185063194671}, 
"Tech Green": {lat: 33.774811772103796, lng: -84.39730321660512}, "Burger Bowl": {lat: 33.780112128688366, lng: -84.4031285420176}, 
"Scheller Building": {lat: 33.77653683761043, lng: -84.38774072028262}, "Tech Tower": {lat: 33.77261541186015, lng: -84.394686474276}, 
"Bobby Dodd Stadium": {lat: 33.77273656674148, lng: -84.39341443564236}, "McCamish Pavillion": {lat: 33.78100044043239, lng: -84.39279806078187}}

const timeData = [
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

const locationData = [
  "Clough Commons",
  "Campus Recreation Center",
  "Student Center",
  "Ferst Center for the Arts",
  "Price Gilbert Library",
  "Crosland Tower",
  "Klaus Atrium",
  "College of Computing",
  "Kendeda Building",
  "Exhibition Hall",
  "Tech Green",
  "Burger Bowl",
  "Scheller Building",
  "Tech Tower",
  "Bobby Dodd Stadium",
  "McCamish Pavillion",
];

export default function Mapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedEvents, setLoadedEvents] = useState([]);

  const [moderator, setModerator] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function getCookie(name) {
    const value = (';' + document.cookie);
    const parts = value.split(';' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
}

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const events = [];

        for (const key in data) {
          const event = {
            id: key,
            ...data[key]
          }

          events.push(event);
        }
        fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/users/"+getCookie("userid")+".json").then((response) => {
          return response.json()
        }).then((data) => {
          if (data !== null) {
            setName(data.name);
            setModerator(data.occupation === "Moderator");
            setEmail(data.email);
          }
          setIsLoading(false);
          setLoadedEvents(events);  
        })
      });
  }, []);

    //put in env variable
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyC-mqMprsEOyo-iOJW_S9G82YaxysbRNLk"})

    if (!isLoaded) return <div> Rambling...</div>;

    return <Map events={loadedEvents}/>;
}


function Map(props) {
    const [openFilter, setOpenFilter] = useState(false);
    const [openedEvent, setOpenedEvent] = useState(null);

    const [filterTimeModal, setFilterTimeModal] = useState(false);
    const [filterHostModal, setFilterHostModal] = useState(false);
    const [filterLocationModal, setFilterLocationModal] = useState(false);

    const [filterHost, setFilterHost] = useState();
    const [filterLoc, setFilterLoc] = useState();
    const [filterTime, setFilterTime] = useState();

    const filterHostRef = useRef();
    const filterLocRef = useRef();
    const filterTimeRef = useRef();

    const [moderator, setModerator] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [loadedEvents, setLoadedEvents] = useState([]);

    const center = useMemo(() => ({lat: 33.775620, lng: -84.396286}),[]);

    function getCookie(name) {
      const value = ";" + document.cookie;
      const parts = value.split(";" + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const handleFilterClose = () => {
      setOpenFilter(false);
      setFilterLocationModal(false);
      setFilterHostModal(false);
      setFilterTimeModal(false);
      setFilterHost();
      setFilterLoc();
      setFilterTime();
    };

    const handleFilterHost = () => {
      const enteredHostFilter = filterHostRef.current.value;
      setOpenFilter(false);
      setFilterHostModal(false);
      setIsLoading(true);
      fetch(
        "https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events.json"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const events = [];

          for (const key in data) {
            if (enteredHostFilter === data[key].host) {
              const event = {
                id: key,
                ...data[key],
              };

              events.push(event);
            }
          }
          fetch(
            "https://campus-discovery-d21d2-default-rtdb.firebaseio.com/users/" +
              getCookie("userid") +
              ".json"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              if (data !== null) {
                setName(data.name);
                setEmail(data.email);
                setModerator(data.occupation === "Moderator");
              }
              setIsLoading(false);
              setLoadedEvents(events);
            });
        });
    };

    const handleFilterLoc = () => {
      const enteredLocFilter = filterLocRef.current.value;
      setOpenFilter(false);
      setFilterLocationModal(false);
      setIsLoading(true);
      fetch(
        "https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events.json"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const events = [];

          for (const key in data) {
            if (enteredLocFilter === data[key].location) {
              const event = {
                id: key,
                ...data[key],
              };

              events.push(event);
            }
          }
          fetch(
            "https://campus-discovery-d21d2-default-rtdb.firebaseio.com/users/" +
              getCookie("userid") +
              ".json"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              if (data !== null) {
                setName(data.name);
                setEmail(data.email);
                setModerator(data.occupation === "Moderator");
              }
              setIsLoading(false);
              setLoadedEvents(events);
            });
        });
    };

    const handleFilterTime = () => {
      const enteredTimeFilter = filterTimeRef.current.value;
      setOpenFilter(false);
      setFilterTimeModal(false);
      setIsLoading(true);
      fetch(
        "https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events.json"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const events = [];

          for (const key in data) {
            if (enteredTimeFilter === data[key].time) {
              const event = {
                id: key,
                ...data[key],
              };

              events.push(event);
            }
          }
          fetch(
            "https://campus-discovery-d21d2-default-rtdb.firebaseio.com/users/" +
              getCookie("userid") +
              ".json"
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              if (data !== null) {
                setName(data.name);
                setEmail(data.email);
                setModerator(data.occupation === "Moderator");
              }
              setIsLoading(false);
              setLoadedEvents(events);
            });
        });
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* map */}

        <GoogleMap
          // map styling
          mapContainerStyle={{
            height: "85vh",
            width: "98vw",
          }}
          zoom={15}
          center={center}
          mapContainerClassName="map-container"
        >
          {/* //markers on map */}
          {props.events.map((event) => (
            <div>
              {!(openedEvent == event) && event.location != undefined && (
                <MarkerF
                  onClick={() => setOpenedEvent(event)}
                  position={mapCoords[event.location]}
                  key={event.id}
                />
              )}
              {openedEvent == event && (
                <InfoWindow
                  position={mapCoords[event.location]}
                  key={event.id}
                  onCloseClick={() => setOpenedEvent(null)}
                >
                  <div>
                    <p style={{ color: "black" }}>{event.title}</p>
                    <p style={{ color: "black" }}>{event.description}</p>
                    <p style={{ color: "black" }}>{event.host}</p>
                    <p style={{ color: "black" }}>
                      <br></br>Invite - Only: {stringify(event.invite)}
                    </p>
                    <p style={{ color: "black" }}>Time: {event.time}</p>
                    <p style={{ color: "black" }}>
                      <br></br>Capacity:{" "}
                      {event.willAttendList != undefined
                        ? event.willAttendList.length
                        : 0}{" "}
                      / {event.capacity}{" "}
                    </p>
                  </div>
                </InfoWindow>
              )}
            </div>
          ))}
        </GoogleMap>

        {/* //buttons */}

        <div
          className={classes.createEventButton}
          style={{ position: "fixed", top: "10px", left: "300px" }}
        >
          <>
            <Group position="center">
              <Link to={"/events"}>
                <Button
                  className="createEventButton"
                  variant="gradient"
                  gradient={{ from: "#003057", to: "#003057" }}
                >
                  View as List
                </Button>
              </Link>
            </Group>
          </>
        </div>

        <div
          className={classes.createEventButton}
          style={{ position: "fixed", top: "10px", left: "10px" }}
        >
          <>
            <Group position="center">
              <Link to={"/"}>
                <Button
                  className="createEventButton"
                  variant="gradient"
                  gradient={{ from: "#003057", to: "#003057" }}
                >
                  Back To Home
                </Button>
              </Link>
            </Group>
          </>
        </div>

        <div
          className={classes.createEventButton}
          style={{ position: "fixed", top: "10px", left: "150px" }}
        >
          <>
            <Group position="center">
              <Link to={"/createEvent"}>
                <Button
                  className="createEventButton"
                  variant="gradient"
                  gradient={{ from: "#003057", to: "#003057" }}
                >
                  Create An Event
                </Button>
              </Link>
            </Group>
          </>
        </div>
        <div
          className={classes.createEventButton}
          style={{ position: "fixed", top: "10px", left: "545px" }}
        >
          <>
            <Group position="center">
              <Button
                className="createEventButton"
                variant="gradient"
                gradient={{ from: "#003057", to: "#003057" }}
                onClick={() => setOpenFilter(true)}
              >
                Filter
              </Button>
            </Group>
          </>
        </div>
        <Modal
          opened={openFilter}
          onClose={() => setOpenFilter(false)}
          title="Filter By:"
        >
          <div>
            <Button
              className="createEventButton"
              variant="gradient"
              gradient={{ from: "#003057", to: "#003057" }}
              onClick={() => setFilterTimeModal(true)}
            >
              Time
            </Button>
            <Modal
              onClose={handleFilterClose}
              title="Search by time:"
              opened={filterTimeModal}
            >
              <Select
                className={classes.control}
                label="Enter Start Time"
                placeholder="Pick one"
                required
                withAsterisk
                data={timeData}
                ref={filterTimeRef}
              />
              <Button onClick={handleFilterTime}>Submit</Button>
            </Modal>
            <Button
              className="createEventButton"
              variant="gradient"
              gradient={{ from: "#003057", to: "#003057" }}
              style={{ position: "fixed", top: "65px", left: "150px" }}
              onClick={() => setFilterHostModal(true)}
            >
              Host
            </Button>
            <Modal
              onClose={handleFilterClose}
              title="Search by location:"
              opened={filterHostModal}
            >
              <TextInput
                className={classes.control}
                placeholder="Host"
                label="Event Host"
                htmlFor="host"
                id="host"
                ref={filterHostRef}
              />
              <Button onClick={handleFilterHost}>Submit</Button>
            </Modal>

            <Button
              className="createEventButton"
              variant="gradient"
              gradient={{ from: "#003057", to: "#003057" }}
              style={{ position: "fixed", top: "65px", left: "275px" }}
              onClick={() => setFilterLocationModal(true)}
            >
              Location
            </Button>
            <Modal
              onClose={handleFilterClose}
              title="Search by location:"
              opened={filterLocationModal}
            >
              <Select
                className={classes.control}
                label="Location"
                placeholder="Event Location"
                required
                withAsterisk
                data={locationData}
                ref={filterLocRef}
              />
              <Button onClick={handleFilterLoc}>Submit</Button>
            </Modal>
          </div>
        </Modal>
      </div>
    );
}


