import EventItem from "./eventItem";
import classes from "./eventList.module.css";
import { Grid } from "@mantine/core";
import { useState } from 'react';

function EventList(props) {
  const [activePage, setPage] = useState(1);
  return (
    <div className={classes.eventLists}>
    <Grid className={classes.list} justify="center">
      <Grid.Col span={10}></Grid.Col>
      {props.events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          host={event.host}
          description={event.description}
          location={event.location}
          image={event.image}
          time={event.time}
          capacity={event.capacity}
          invite={event.invite}
          creator={event.creator}
          userid={props.userid}
          moderator={props.moderator}
          email={props.email}
          invitedList={event.invitedList}
          willAttendList={event.willAttendList}
          maybeAttendList={event.maybeAttendList}
          wontAttendList={event.wontAttendList}
          name={props.name}
        />
      ))}
    </Grid>
    </div>
  );
}

export default EventList;
