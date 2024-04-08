import NewEventForm from "../events/newEventForm";
import { useNavigate } from "react-router-dom";


function NewEventPage() {

    const navigate = useNavigate();

    function addEventHandler(eventData) {
        fetch(
            'https://campus-discovery-d21d2-default-rtdb.firebaseio.com/events.json',
         {
          method: "POST",
          body: JSON.stringify(eventData),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
            navigate('/events')
        });
    }

    return (
        <section>
            <h1 style={{display : "flex", justifyContent : "center", alignItems : "center"}}>Add New Event</h1>
            <NewEventForm onAddEvent={addEventHandler} />
        </section>
    );
}

export default NewEventPage;