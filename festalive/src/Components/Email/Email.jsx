import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styling.css";
import { initializeApp } from "@firebase/app";
import { getDatabase } from "firebase/database";
import { ref, set, get, update, remove, child } from "firebase/database";
import * as XLSX from "xlsx"; // Import xlsx for Excel export

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
const dbref = ref(database);

export default function Chat({ auth }) {
  const [dataa, setDatas] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          get(child(dbref, `festalive/`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const allposts = snapshot.val();
                let instaposts = [];
                snapshot.forEach((childSnapshot) => {
                  let post = childSnapshot.val();
                  instaposts.push(post);
                });
                setDatas(instaposts);
              }
            })
            .catch((err) => console.error(err));
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to export data to Excel
  const exportToExcel = () => {
    // Define data for Excel
    const worksheetData = dataa.map((item, index) => ({
      S_N: index + 1,
      Email: item.email || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData); // Convert data to worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate Excel file and download
    XLSX.writeFile(workbook, "Festalive-Emails.xlsx");
  };

  const renderHeader = () => {
    let headerElement = ["S/N","Email"];
    return headerElement.map((key, index) => <th key={index}>{key}</th>);
  };

  return (
    <div className="containers">
      <div className="mainpages">
        <main className="mainpagex">
          <div className="lowersectt">
            <Link to="/">
              <div className="dashoos">
                <p style={{ fontWeight: "bold", fontSize: "9px" }}>{"<<"}</p>
              </div>
            </Link>

            <div className="upmeters">
              <div className="leftlists">
                <p id="totss">Total Registered</p>

                <p style={{ fontWeight: "111", fontSize: "9px" }}>
                  {dataa?.length}
                </p>

              
              </div>
              <button onClick={exportToExcel} className="export-button">
                Download
              </button>
            </div>

            <div className="lowmetero">
              <table id="employee">
                <thead>
                  <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                  {dataa.map((val, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{val?.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {dataa.length === 0 && (
                <div className="lstss">
                  <p>No Email Available</p>
                </div>
              )}
            </div>
            {/* Button to export data to Excel */}
          </div>
        </main>
      </div>
    </div>
  );
}
