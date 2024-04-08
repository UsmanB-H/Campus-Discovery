import classes from "./eventItem.module.css";
import { useState, useEffect } from "react";
import { Card, Button, Modal } from "@mantine/core";
import { useRef } from "react";
import { TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useSetState } from "@mantine/hooks";
import { stringify } from "@firebase/util";


function EventItem(props) {
  
  const [openedInfo, setOpenedInfo] = useState(false);
  const [openedEdit, setOpenedEdit] = useState(false);
  const [openedInvite, setOpenedInvite] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title);
  const [editHost, setEditHost] = useState(props.host);
  const [editDesc, setEditDesc] = useState(props.description);
  const [editLoc, setEditLoc] = useState(props.location);
  const [editTime, setEditTime] = useState(props.time);
  const [editImage, setEditImage] = useState(props.image);
  const [editCapacity, setEditCapacity] = useState(props.capacity);
  const [status, setStatus] = useState("undecided");
  const [totalAttending, setTotalAttending] = useState(0);
  const [userEmail, setUserEmail] = useState();

  const [openAttending, setOpenAttending] = useState(false);
  const [openMaybeAttending, setOpenMaybeAttending] = useState(false);
  const [openWontAttend, setOpenWontAttend] = useState(false);
  


  const updateid = props.id;
  const editable = props.moderator || (props.userid !== undefined && props.creator === props.userid)
  const invited = !props.invite || (props.invitedList !== undefined && props.invitedList.includes(props.email));

  const titleInputRef = useRef();
  const hostInputRef = useRef();
  const descriptionInputRef = useRef();
  const locationInputRef = useRef();
  const timeInputRef = useRef();
  const imageInputRef = useRef();
  const capacityInputRef = useRef();

  const userEmailInputRef = useRef();

  useEffect(() => {
    if (props.willAttendList != undefined) {
      if (searchAttendingList(props.willAttendList)) setStatus("will")
      setTotalAttending(props.willAttendList.length)
    }
    if (props.maybeAttendList != undefined && searchAttendingList(props.maybeAttendList)) setStatus("maybe")
    if (props.wontAttendList != undefined && searchAttendingList(props.wontAttendList)) setStatus("wont")
  }, []);

  function handleEditClose () {
    setOpenedEdit(false);
    setEditTitle(props.title);
    setEditHost(props.host);
    setEditDesc(props.description);
    setEditLoc(props.location);
    setEditTime(props.time);
    setEditImage(props.image);
    setEditCapacity(props.capacity);

  }

  const handleEditSubmit = () => {
    const editedEventData = {
      title: editTitle,
      host: editHost,
      description: editDesc,
      location: editLoc,
      time: editTime,
      image: editImage,
      capacity: editCapacity
    }
    fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" +updateid +".json", {
      method: "PATCH",
      body: JSON.stringify(editedEventData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload(false)
    })
  }
  const handleDelete = () => {
    fetch(
      "https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" +
        updateid +
        ".json",
      {
        method: "DELETE",
      }
    ).then(() => {
      window.location.reload(false);
    });
  };

  const searchAttendingList = (attendingList) => {
    for(let i = 0; i < attendingList.length; i++) {
      if (attendingList[i][0] == props.userid) return true
    }
    return false
  }

  const willAttend = () => {
    let attendingList = props.willAttendList
    if (attendingList === null || attendingList === undefined) attendingList = []
    if (searchAttendingList(attendingList)) return
    attendingList.push([props.userid, props.name])
    const attendingEventData = {willAttendList: attendingList}
    fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" + updateid + ".json", {
      method: "PATCH",
      body: JSON.stringify(attendingEventData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload(false)
    })
  }

  const maybeAttend = () => {
    let maybeAttendList = props.maybeAttendList
    if (maybeAttendList === null || maybeAttendList === undefined) maybeAttendList = []
    if (searchAttendingList(maybeAttendList)) return
    maybeAttendList.push([props.userid, props.name])
    const maybeAttendingEventData = {maybeAttendList: maybeAttendList}
    fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" + updateid + ".json", {
      method: "PATCH",
      body: JSON.stringify(maybeAttendingEventData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload(false)
    })
  }

  const wontAttend = () => {
    let wontAttendList = props.wontAttendList
    if (wontAttendList === null || wontAttendList === undefined) wontAttendList = []
    if (searchAttendingList(wontAttendList)) return
    wontAttendList.push([props.userid, props.name])
    const wontAttendEventData = {wontAttendList: wontAttendList}
    fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" + updateid + ".json", {
      method: "PATCH",
      body: JSON.stringify(wontAttendEventData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload(false)
    })
  }

  const cancelRSVP = () => {
    if (status == "will") {
      const removed = props.willAttendList.filter(function(value, index, arr){ return value[0] != props.userid })
      const willAttendEventData = { willAttendList: removed }
      fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" + updateid + ".json", {
        method: "PATCH",
        body: JSON.stringify(willAttendEventData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        window.location.reload(false)
      })  
    } else if (status == "maybe") {
      const removed = props.maybeAttendList.filter(function(value, index, arr){ return value[0] != props.userid })
      const maybeAttendingEventData = { maybeAttendList: removed }
      fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" + updateid + ".json", {
        method: "PATCH",
        body: JSON.stringify(maybeAttendingEventData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        window.location.reload(false)
      })  
    } else if (status == "wont") {
      const removed = props.wontAttendList.filter(function(value, index, arr){ return value[0] != props.userid })
      const wontAttendEventData = { wontAttendList: removed }
      fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" + updateid + ".json", {
        method: "PATCH",
        body: JSON.stringify(wontAttendEventData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        window.location.reload(false)
      })  
    }
  }

  const deleteAttendant = (list, index) => {
    if (!editable) return
    let attendingList
    let newData
    if (list == "will") {
      attendingList = props.willAttendList
      attendingList.splice(index, 1)
      newData = {willAttendList: attendingList}
    }
    else if (list == "maybe") {
      attendingList = props.maybeAttendList
      attendingList.splice(index, 1)
      newData = {maybeAttendList: attendingList}
    }
    else {
      attendingList = props.wontAttendList
      attendingList.splice(index, 1)
      newData = {wontAttendList: attendingList}
    }
    fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" + updateid + ".json", {
      method: "PATCH",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload(false)
    })
  }

  const handleInviteSubmit = () => {
    let invitedList = props.invitedList;
    if (invitedList === null || invitedList === undefined) invitedList = [];
    invitedList.push(userEmail);
    const invitedListData = { invitedList: invitedList }
    fetch("https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events/" + updateid + ".json",
    {
      method:"PATCH",
      body: JSON.stringify(invitedListData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      window.location.reload(false)
    }).then(() => setOpenedInvite(true));
  };

  return (
    <div>
      <Modal
        size="auto"
        opened={openedInfo}
        onClose={() => setOpenedInfo(false)}
      >
        <div className={classes.image}>
          <img src={props.image} alt={props.title} height={300} />
        </div>
        <div className={classes.content}>
          <p4 className={classes.eventTitle}>{props.title}</p4>
          <p className={classes.eventDescription}>{props.description}</p>
          <p className={classes.eventDescription}>
            {" "}
            <br></br>Invite - Only: {stringify(props.invite)}
          </p>
          <p1 className={classes.eventHost}>{props.host}</p1>
          <address className={classes.eventAddress}>{props.location}</address>
          <p1 className={classes.eventTime}>Time: {props.time}</p1>
          <p1 className={classes.eventCapacity}>
            {" "}
            <br></br> Capacity: {totalAttending} / {props.capacity}
          </p1>
        </div>
        <div>
          <hr></hr>
        </div>
        {status != "undecided" && (
          <div>
            <div className={classes.status}>
              {status == "will" && (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Status: Will Attend
                </p>
              )}
              {status == "maybe" && (
                <p style={{ color: "#8B8000", fontWeight: "bold" }}>
                  Status: May Attend
                </p>
              )}
              {status == "wont" && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  Status: Won't Attend
                </p>
              )}
              <Button
                className={classes.cancelButton}
                variant="gradient"
                gradient={{ from: "#003057", to: "#003057" }}
                onClick={cancelRSVP}
              >
                Cancel RSVP
              </Button>
            </div>
          </div>
        )}
        {status == "undecided" && (
          <div className={classes.AttendStatus}>
            {invited && (
              <div className={classes.AttendStatusButtons}>
                <Button
                  className={classes.attendButton}
                  variant="gradient"
                  gradient={{ from: "#003057", to: "#003057" }}
                  onClick={willAttend}
                >
                  Will Attend
                </Button>
                <Button
                  className={classes.maybeAttendButton}
                  variant="gradient"
                  gradient={{ from: "#003057", to: "#003057" }}
                  onClick={maybeAttend}
                >
                  May Attend
                </Button>
                <Button
                  className={classes.wontAttendButton}
                  variant="gradient"
                  gradient={{ from: "#003057", to: "#003057" }}
                  onClick={wontAttend}
                >
                  Won't Attend
                </Button>
              </div>
            )}
          </div>
        )}
        <div>
          <hr></hr>
        </div>
        <div className={classes.attendingListContainer}>
          <div>
            <h1 className={classes.AttendingListCSS}></h1>{" "}
            {props.willAttendList !== undefined && (
              <p>{stringify(props.willAttendList.size)}</p>
            )}
            <Button variant="gradient" gradient={{ from: "#B3A369", to: "#B3A369" }} onClick={() => setOpenAttending(!openAttending)}>
              {" "}
              Attending List {" "}
            </Button>
            {/* <h1>Attending:</h1>  */}
            {openAttending && props.willAttendList !== undefined && (
              <p>{stringify(props.willAttendList.size)}</p>
            )}
            <div>
              {openAttending &&
                props.willAttendList !== undefined &&
                props.willAttendList !== null &&
                props.willAttendList.map((user, index) => (
                  <p
                    onClick={() => deleteAttendant("will", index)}
                    style={{ cursor: "pointer" }}
                  >
                    {user[1]}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <Button variant="gradient" gradient={{ from: "#B3A369", to: "#B3A369" }}
              onClick={() => setOpenMaybeAttending(!openMaybeAttending)}
            >
              {" "}
              Maybes List{" "}
            </Button>
            <div>
              {openMaybeAttending &&
                props.maybeAttendList !== undefined &&
                props.maybeAttendList !== null &&
                props.maybeAttendList.map((user, index) => (
                  <p
                    onClick={() => deleteAttendant("maybe", index)}
                    style={{ cursor: "pointer" }}
                  >
                    {user[1]}
                  </p>
                ))}
            </div>
          </div>
          <div>
            <Button
              variant="gradient" gradient={{ from: "#B3A369", to: "#B3A369" }}
              onClick={() => setOpenWontAttend(!openWontAttend)}
            >
              {" "}
              Not Attending List{" "}
            </Button>
            <div>
              {openWontAttend &&
                props.wontAttendList !== undefined &&
                props.wontAttendList !== null &&
                props.wontAttendList.map((user, index) => (
                  <p
                    onClick={() => deleteAttendant("wont", index)}
                    style={{ cursor: "pointer" }}
                  >
                    {user[1]}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        opened={openedInvite}
        onClose={() => setOpenedInvite(false)}
        title="Invite Users"
      >
        <form className={classes.form}>
          <TextInput
            className={classes.control}
            placeholder="Email"
            label="Enter User's Email"
            htmlFor="userEmail"
            id="invite"
            ref={userEmailInputRef}
            value={userEmail}
            onChange={(e) => setUserEmail(e.currentTarget.value)}
            required
          />
        <div className={classes.OpenInviteUserModalButtons}>
          <Button
            variant="gradient"
            gradient={{ from: "#003057", to: "#003057" }}
            onClick={() => setOpenedInvite(false)}
          >
            Close
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: "#003057", to: "#003057" }}
            onClick={handleInviteSubmit}
          >
            Invite
          </Button>
        </div>
        </form>
      </Modal>
      <Modal opened={openedEdit} onClose={handleEditClose} title="Edit Event">
        <Card>
          <form className={classes.form}>
            <TextInput
              className={classes.control}
              placeholder="Title"
              label="Event Title"
              htmlFor="title"
              id="title"
              ref={titleInputRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.currentTarget.value)}
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
              value={editHost}
              onChange={(e) => setEditHost(e.currentTarget.value)}
            />

            <TextInput
              className={classes.control}
              placeholder="Description (75 Characters Max)"
              label="Event Description"
              htmlFor="description"
              id="description"
              ref={descriptionInputRef}
              value={editDesc}
              onChange={(e) => setEditDesc(e.currentTarget.value)}
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
              value={editLoc}
              onChange={(e) => setEditLoc(e.currentTarget.value)}
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
              value={editImage}
              onChange={(e) => setEditImage(e.currentTarget.value)}
            />

            <TimeInput
              className={classes.timeControl}
              label="Enter Start Time"
              format="12"
              defaultValue={new Date()}
              htmlFor="time"
              id="time"
              ref={timeInputRef}
              value={editTime}
              onChange={(e) => setEditTime(e.currentTarget.value)}
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
              value={editCapacity}
              onChange={(e) => setEditCapacity(e.currentTarget.value)}
              required
              withAsterisk
            />
          </form>
        </Card>
        <div className={classes.openEditModalButtons}>
          <Button
            variant="gradient"
            gradient={{ from: "#003057", to: "#003057" }}
            onClick={handleEditSubmit}
          >
            Save Changes
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: "#003057", to: "#003057" }}
            onClick={handleEditClose}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Card
        centered
        shadow="lg"
        p="sm"
        radius="lg"
        withBorder
        size="sm"
        className={classes.eventCard}
      >
        <li className={classes.item}>
          <div className={classes.image}>
            <img src={props.image} alt={props.title} height={300} />
          </div>
          <div className={classes.content}>
            <p4 className={classes.eventTitle}>{props.title}</p4>
          </div>
          <div className={classes.mainActionButtons} style={{ justifyContent: "center" }}>
            <Button
              className={classes.moreButtonCSS}
              variant="gradient"
              gradient={{ from: "#003057", to: "#003057" }}
              onClick={() => setOpenedInfo(true)}
            >
              More
            </Button>
            {editable && (
              <div>
                <Button
                  className={classes.deleteButtonCSS}
                  variant="gradient"
                  gradient={{ from: "#003057", to: "#003057" }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="gradient"
                  gradient={{ from: "#003057", to: "#003057" }}
                  onClick={() => setOpenedEdit(true)}
                >
                  Edit
                </Button>
              </div>
            )}

            {editable && props.invite && (
              <Button
                className={classes.inviteUserButton}
                variant="gradient"
                gradient={{ from: "#003057", to: "#003057" }}
                onClick={() => setOpenedInvite(true)}
              >
                Invite Users
              </Button>
            )}
          </div>
        </li>
      </Card>
    </div>
  );
}

export default EventItem;
