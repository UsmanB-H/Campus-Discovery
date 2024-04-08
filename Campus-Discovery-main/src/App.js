import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import Home from "./components/Pages/home";
import SignUp from "./components/Pages/signUp";
import Events from "./components/Pages/events";
import NewEventPage from "./components/Pages/newEvent";
import UpdateEvent from "./components/events/updateEvent";
import Mapper from "./components/Pages/map";
import "./App.css";

export default function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/events" element={<Events />}></Route>
        <Route path="/createEvent" element={<NewEventPage />}></Route>
        <Route path="/updateEvent" element={<UpdateEvent />}></Route>
        <Route path="/map" element={<Mapper/>}> </Route>
        </Routes>
      
      
    </div>
  );
}
