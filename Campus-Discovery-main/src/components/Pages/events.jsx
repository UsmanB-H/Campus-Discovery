import { Link } from "react-router-dom";
import { Button, Group, Select, TextInput } from "@mantine/core";
import classes from "./events.module.css";
import { useState, useEffect } from "react";
import { useRef } from 'react';
import EventList from "../events/eventList";
import { Pagination } from '@mantine/core';
import { Modal } from "@mantine/core";

const timeData = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", 
    "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", 
    "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", 
    "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", 
    "11:00 PM", "11:30 PM"]

const locationData = ["Clough Commons", "Campus Recreation Center", "Student Center", 
    "Ferst Center for the Arts", "Price Gilbert Library", "Crosland Tower", "Klaus Atrium", 
    "College of Computing", "Kendeda Building", "Exhibition Hall", "Tech Green", "Burger Bowl", 
    "Scheller Building", "Tech Tower", "Bobby Dodd Stadium", "McCamish Pavillion"]

function Events() {
  const [openMyEvents, setOpenMyEvents] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedEvents, setLoadedEvents] = useState([]);


  const [filterTimeModal, setFilterTimeModal] = useState(false);
  const [filterHostModal, setFilterHostModal] = useState(false);
  const [filterLocationModal, setFilterLocationModal] = useState(false);

  const [filterHost, setFilterHost] = useState();
  const [filterLoc, setFilterLoc] = useState();
  const [filterTime, setFilterTime] = useState();

  const filterHostRef = useRef();
  const filterLocRef = useRef();
  const filterTimeRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage, setEventsPerPage] = useState(10);
  const [moderator, setModerator] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const numberPages = Math.ceil(loadedEvents.length / eventsPerPage)
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = (loadedEvents.slice(indexOfFirstEvent, indexOfLastEvent));
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
            setEmail(data.email);
            setModerator(data.occupation === "Moderator");
          }
          setIsLoading(false);
          setLoadedEvents(events);  
        })
      });
  }, []);

  if (isLoading) {
    return <section>
      <h1>Loading ... </h1>
    </section>
  }

  let attendingEvents = [];
  const searchAttendingList = (event) => {
    let attendingList = event.willAttendList;
    for(let i = 0; i < attendingList.length; i++) {
      if (attendingList[i][0] === getCookie("userid")){
        attendingEvents.push(event)
        timeConflict(attendingEvents)
        return true;
      }
    }
    return false
  }
  
  let conflicts = [];
  const timeConflict = (e) => {
    let times = [];
    for (let i = 0; i < e.length; i++) {
      if (times.includes(e[i].time)) {
        conflicts.push(e[i].time);
      }
      times.push(e[i].time);
    }
  }

  const handleFilterClose = () => {
    setOpenFilter(false);
    setFilterLocationModal(false);
    setFilterHostModal(false);
    setFilterTimeModal(false);
    setFilterHost();
    setFilterLoc();
    setFilterTime();
  }

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
  }

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
    <div className={classes.eventsPage}>
      <Modal
        opened={openMyEvents}
        onClose={() => setOpenMyEvents(false)}
        title="My Events"
      >
        <div>
          {currentEvents.map(
            (event) =>
              event.willAttendList !== undefined &&
              searchAttendingList(event) && (
                <div>
                  {conflicts.includes(event.time) && (
                    <p style={{ color: "red" }}>{event.title}</p>
                  )}
                  {!conflicts.includes(event.time) && <p>{event.title}</p>}
                </div>
              )
          )}
        </div>
      </Modal>

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

      <section>
        <EventList
          events={currentEvents}
          userid={getCookie("userid")}
          moderator={moderator}
          name={name}
          email={email}
        />
        <ul>
          <Pagination
            className={classes.pagination}
            page={currentPage}
            onChange={setCurrentPage}
            total={numberPages}
            initialPage={1}
          />
        </ul>
      </section>
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
        style={{ position: "fixed", top: "10px", left: "430px" }}
      >
        <>
          <Group position="center">
            <Button
              className="createEventButton"
              variant="gradient"
              gradient={{ from: "#003057", to: "#003057" }}
              onClick={() => setOpenMyEvents(true)}
            >
              My Events
            </Button>
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

      <div
        className={classes.createEventButton}
        style={{ position: "fixed", top: "10px", left: "300px" }}
      >
        <>
          <Group position="center">
            <Link to={"/map"}>
              <Button
                className="createEventButton"
                variant="gradient"
                gradient={{ from: "#003057", to: "#003057" }}
              >
                View as Map
              </Button>
            </Link>
          </Group>
        </>
      </div>

      <div
        className={classes.backButton}
        style={{ position: "fixed", top: "10px", left: "10px" }}
      >
        <Link to={"/"}>
          <Button
            className="backButton"
            variant="gradient"
            gradient={{ from: "#003057", to: "#003057" }}
          >
            Back To Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Events;
