import { useState } from "react";

import { initializeApp } from "@firebase/app";
import { getDatabase } from "firebase/database";
import { ref, set, get, update, remove, child } from "firebase/database";

function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDULsGioNpdaBgFRJvyV-4wxYTfP7Q9fM4",
    authDomain: "ackcess-a9060.firebaseapp.com",
    projectId: "ackcess-a9060",
    storageBucket: "ackcess-a9060.firebasestorage.app",
    messagingSenderId: "972227509687",
    appId: "1:972227509687:web:a638f28a54d79e2fd8fc32",
    measurementId: "G-N23BVR7PVQ",
  };

  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

const database = StartFirebase();
const db = database;
const dbref = ref(db);

function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  function generateSeparatedString() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const getRandom = (chars, length) => {
      return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    };

    const parts = [];
    for (let i = 0; i < 2; i++) {
      parts.push(getRandom(letters, 2));
      parts.push(getRandom(numbers, 2));
    }

    return parts.join("");
  }

  const submit = (e) => {
    const rnd = generateSeparatedString();

    if (email) {
      update(ref(db, `festalive/${rnd}`), {
        email: email,
      }).then(() => {
        setStatus("Subscribed successfully!");
        setEmail("");
      });
    } else {
      setStatus("Enter your email!");
    }
  };
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <div className="crc">
            <div className="thedot"></div>
          </div>
          <img
            src="/assets/festalivelogowhite.png"
            alt="Festalive"
            className="logo"
          />
          <p className="p-one">
            One platform to <b>discover events</b>, <br /> <b>book tickets </b>
            and <b>hire creators.</b>
          </p>
          <p className="p-two">Be among the first to access it.</p>
          {status && <div className="status">{status}</div>}
          <div className="inputting">
            <div className="email-input">
              <input
                type="email"
                className="input"
                input="email"
                placeholder="Please Give us your email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <button className="submit-button" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
