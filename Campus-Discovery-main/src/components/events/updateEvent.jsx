import classes from "./newEventForm.module.css";
import { TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useRef } from 'react';
import { Card, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import React from "react";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { initializeApp } from "firebase/app";

export default function UpdateEvent(props) {
    const firebaseConfig = {
        // ...
        // The value of `databaseURL` depends on the location of the database
        databaseURL: "https://campus-discovery-d21d2-default-rtdb.firebaseio.com",
      };
      
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    
    // Initialize Realtime Database and get a reference to the service
    const database = getDatabase(app);

    const titleInputRef = useRef();
    const hostInputRef = useRef();
    const descriptionInputRef = useRef();
    const locationInputRef = useRef();
    const timeInputRef = useRef();
    const imageInputRef = useRef();
    const capacityInputRef = useRef();


    function submitHandler(e) {
        e.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredHost = hostInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredLocation = locationInputRef.current.value;
        const enteredTime = timeInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredCapacity = capacityInputRef.current.value;

        const eventData = {
            title: enteredTitle,
            host: enteredHost,
            description: enteredDescription,
            location: enteredLocation,
            time: enteredTime,
            image: enteredImage,
            capacity: enteredCapacity
        };

        const updates = {};
        console.log(eventData);
        updates['/events/' + props.id] = eventData;   //pass props into there
        console.log(updates)
        return update(ref(database), updates);
    }

  return (
    <>
      <div>
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
              Cancel
            </Button>
          </Link>
        </div>
        <Card>
          <form onSubmit={submitHandler} className={classes.form}>
            <TextInput
              className={classes.control}
              placeholder="Title"
              label="Event Title"
              htmlFor="title"
              id="title"
              ref={titleInputRef}
              required
              withAsterisk
            />

            <TextInput
              className={classes.control}
              placeholder="Host"
              label="Event Host"
              htmlFor="host"
              id="host"
              ref={hostInputRef}
            />

            <TextInput
              className={classes.control}
              placeholder="Description (75 Characters Max)"
              label="Event Description"
              htmlFor="description"
              id="description"
              ref={descriptionInputRef}
              required
              withAsterisk
            />

            <TextInput
              className={classes.control}
              placeholder="Location"
              label="Event Location"
              htmlFor="location"
              id="location"
              ref={locationInputRef}
              required
              withAsterisk
            />

            <TextInput
              className={classes.control}
              placeholder="URL Link"
              label="Image"
              htmlFor="image"
              id="image"
              required
              ref={imageInputRef}
            />

            <TimeInput
              className={classes.timeControl}
              label="Enter Start Time"
              format="12"
              defaultValue={new Date()}
              htmlFor="time"
              id="time"
              ref={timeInputRef}
              required
              withAsterisk
            />

            <TextInput
              className={classes.control}
              placeholder="Capacity"
              label="Capacity"
              htmlFor="capacity"
              id="capacity"
              ref={capacityInputRef}
              required
              withAsterisk
            />

            <div className={classes.actions}>
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: "#003057", to: "#003057" }}
              >
                Update
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
