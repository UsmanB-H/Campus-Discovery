import React from "react";
import classes from "./home.module.css";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import Navbar from "../home/navbar";

export default function home() {
  return (
    <div className="homepage">
      <header className="navbarheader">
        <Navbar />
      </header>
      <h1 className={classes.starth1}> Welcome to GT Campus Discovery</h1>
      <div
        style={{ paddingTop: "0px", display: "flex", justifyContent: "center" }}
      >
        <Link to={"/SignUp"}>
          <Button
            className="continueButton"
            variant="gradient"
            gradient={{ from: "#003057", to: "#003057" }}
            radius="md"
            size="xl"
          >
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
}
