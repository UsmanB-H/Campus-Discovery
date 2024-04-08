import classes from "./newEventForm.module.css";
import { Select, TextInput } from "@mantine/core";
import { useRef } from 'react';
import { Card, Button, Checkbox } from "@mantine/core";
import { Link } from "react-router-dom";
import React from "react";

function NewEventForm(props) {

    const titleInputRef = useRef();
    const hostInputRef = useRef();
    const descriptionInputRef = useRef();
    const locationInputRef = useRef();
    const timeInputRef = useRef();
    const imageInputRef = useRef();
    const capacityInputRef = useRef();
    const inviteInputRef = useRef();

    // const timeData = Array(48).fill(0).map((_, index) => `${index} PM`);
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

    function getCookie(name) {
        const value = (';' + document.cookie);
        const parts = value.split(';' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


    function submitHandler(e) {
        e.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredHost = hostInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredLocation = locationInputRef.current.value;
        const enteredTime = timeInputRef.current.value;
        const enteredImage = imageInputRef.current.value;
        const enteredCapacity = capacityInputRef.current.value;
        const selectedInvite = inviteInputRef.current.checked;


        const eventData = {
            title: enteredTitle,
            host: enteredHost,
            description: enteredDescription,
            location: enteredLocation,
            time: enteredTime,
            image: enteredImage,
            capacity: enteredCapacity,
            invite: selectedInvite,
            creator: getCookie('userid')
        };

        props.onAddEvent(eventData);
    }

  return (

    <div style={{display: "flex", justifyContent : "center", alignItems : "center"}}>
      <div
        className={classes.backButton}
        style={{ position: "fixed", top: "10px", left: "10px" }}
      >
        <Link to={"/events"}>
          <Button
            className="backButton"
            variant="gradient"
            gradient={{ from: "#003057", to: "#003057" }}
          >
            Back To Events
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

          {/* <TextInput
            className={classes.control}
            placeholder="Location"
            label="Event Location"
            htmlFor="location"
            id="location"
            ref={locationInputRef}
            required
            withAsterisk
          /> */}

          <Select
            className={classes.control}
            label="Location"
            placeholder="Event Location"
            required
            withAsterisk
            data={locationData}
            ref={locationInputRef}
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

          <Select
            className={classes.control}
            label="Enter Start Time"
            placeholder="Pick one"
            required
            withAsterisk
            data={timeData}
            ref={timeInputRef}
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

          <Checkbox label="Invite-Only" htmlFor="invite" id="invite" ref={inviteInputRef}/>

          <div className={classes.actions}>
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "#003057", to: "#003057" }}
            >
              Create
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default NewEventForm;
