import { Link } from "react-router-dom";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import classes from "./events.module.css";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { Select } from "@mantine/core";

export default function Events() {
  const [opened, setOpened] = useState(false);
  const [opened1, setOpened1] = useState(false);
  const [opened2, setOpened2] = useState(false);

  return (
    <div className={classes.eventsPage}>
      <div
        className={classes.createEventButton}
        style={{ position: "fixed", top: "10px", left: "150px" }}
      >
        <>
          <div>
            <Modal
              centered
              className={classes.createEventButton}
              opened={opened}
              onClose={() => setOpened(false)}
              title="Create An Event!"
            >
              <form>
                <TextInput
                  placeholder="Title"
                  label="Event Title"
                  withAsterisk
                />

                <TextInput placeholder="Host" label="Event Host" withAsterisk />

                <TextInput
                  placeholder="Description (75 Characters Max)"
                  label="Event Description"
                  withAsterisk
                />

                <TextInput
                  placeholder="Location"
                  label="Event Location"
                  withAsterisk
                />

                <TimeInput
                  label="Enter Start Time"
                  format="12"
                  defaultValue={new Date()}
                  withAsterisk
                />

                <TimeInput
                  label="Enter End Time"
                  format="12"
                  defaultValue={new Date()}
                  withAsterisk
                />

                <div className={classes.confirmEventButton}>
                  <Button
                    onClick={() => setOpened(false)}
                    variant="gradient"
                    gradient={{ from: "#003057", to: "#003057" }}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </Modal>
          </div>
          <Group position="center">
            <Button
              onClick={() => setOpened(true)}
              className="createEventButton"
              variant="light"
              color="green"
            >
              Create An Event
            </Button>
          </Group>
        </>
      </div>
      <div
        className={classes.deleteEventButton}
        style={{ position: "fixed", top: "10px", left: "305px" }}
      >
        <>
          <Modal
            centered
            opened={opened1}
            onClose={() => setOpened1(false)}
            title="Delete An Event!"
          >
            <Select
              label="Select An Event"
              placeholder="Pick one"
              data={[
                { value: "event1", label: "event1" },
                { value: "event2", label: "event2" },
                { value: "event3", label: "event3" },
                { value: "event4", label: "event4" },
              ]}
            />
            <div className={classes.confirmEventButton}>
              <Button
                onClick={() => setOpened1(false)}
                variant="gradient"
                gradient={{ from: "#003057", to: "#003057" }}
              >
                Delete
              </Button>
            </div>
          </Modal>

          <Group position="center">
            <Button
              onClick={() => setOpened1(true)}
              className="createEventButton"
              variant="light"
              color="red"
            >
              Delete An Event
            </Button>
          </Group>
        </>
      </div>
      <div
        className={classes.deleteEventButton}
        style={{ position: "fixed", top: "10px", left: "458px" }}
      >
        <>
          <Modal
            centered
            opened={opened2}
            onClose={() => setOpened2(false)}
            title="Edit An Event!"
          >
            <TextInput placeholder="Title" label="Event Title" withAsterisk />
            <div className={classes.confirmEventButton}>
              <Button
                onClick={() => setOpened2(false)}
                variant="gradient"
                gradient={{ from: "#003057", to: "#003057" }}
              >
                IDK how to let them edit the event
              </Button>
            </div>
          </Modal>

          <Group position="center">
            <Button
              onClick={() => setOpened2(true)}
              className="createEventButton"
              variant="light"
              color="grey"
            >
              Edit An Event
            </Button>
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
      {/*
                <div className={classes.list1}>
                <div className="Event1" style={{position: 'flex', top:'120px', left:'10px', padding: "10px"}}>
                    <div style={{}}>
                        <h1>Events</h1>
                    </div>
                        <Card shadow="sm" p="lg" radius="md" withBorder>
                            <Card.Section>
                                <Image
                                    src="https://brand.gatech.edu/sites/default/files/inline-images/GeorgiaTech_RGB_0.png"
                                        height={100}
                                        alt="Event1"
                                    />
                            </Card.Section>

                                <Group position="apart" mt="md" mb="xs">
                                    <Text weight={500}>Event 1</Text>
                                    <Badge color="pink" variant="light">
                                        00:00am - 00:00pm
                                    </Badge>
                                </Group>

                                    <Text size="sm" color="dimmed">
                                        Event 1 Description
                                    </Text>

                                    <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                                        Click To Attend
                                    </Button>
                        </Card>
                </div>
                <div className="Event2" style={{position: 'flex', top:'400px', left:'10px', padding: "10px"}}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src="https://brand.gatech.edu/sites/default/files/inline-images/GeorgiaTech_RGB_0.png"
                                height={100}
                                alt="Event2"
                            />
                        </Card.Section>

                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Event 2</Text>
                            <Badge color="pink" variant="light">
                                00:00am - 00:00pm
                            </Badge>
                        </Group>

                        <Text size="sm" color="dimmed">
                            Event 2 Description
                        </Text>

                        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                            Click To Attend
                        </Button>
                        </Card>
                </div>
                <div className="Event3" style={{position: 'flex', top:'680px', left:'10px', padding: "10px"}}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src="https://brand.gatech.edu/sites/default/files/inline-images/GeorgiaTech_RGB_0.png"
                                height={100}
                                alt="Event3"
                            />
                        </Card.Section>

                        <Group position="apart" mt="md" mb="xs">
                            <Text weight={500}>Event 3</Text>
                            <Badge color="pink" variant="light">
                                00:00am - 00:00pm
                            </Badge>
                        </Group>

                        <Text size="sm" color="dimmed">
                            Event 3 Description
                        </Text>

                        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                            Click To Attend
                        </Button>
                        </Card>
                </div>
            </div>
    */}
    </div>
  );
}

{/*
constructor(props) {
    super(props);
    this.state = {
      title: "",
      host: "",
      description: "",
      location: "",
      time: "",
    };
  }

  render() {
    return (
      <div>
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://brand.gatech.edu/sites/default/files/inline-images/GeorgiaTech_RGB_0.png"
              height={100}
              alt="Event1"
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>Event 1</Text>
            <Badge color="pink" variant="light">
              00:00am - 00:00pm
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            Event 1 Description
          </Text>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Click To Attend
          </Button>
        </Card>
      </div>
    );
  }
}

*/}