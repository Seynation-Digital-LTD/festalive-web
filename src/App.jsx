import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <img
            src="/assets/festalivelogowhite.png"
            alt="Festalive"
            className="logo"
          />
          <p className="p-one">
            One platform to <b>discover events</b>, <br /> <b>book tickets </b>
            and <b>hire creators.</b>
          </p>
          <p className="p-two">Be among the first to acces it.</p>
          <div className="inputting">
          <div className="email-input">
            <input type="email" className="input" placeholder="Give us your email, Press ENTER to Send."></input>
          </div>
          <button className="submit-button">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
