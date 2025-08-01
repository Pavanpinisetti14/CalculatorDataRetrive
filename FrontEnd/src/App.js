import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/DataRetrieve")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const flamesArr = [];
  const loveArr = [];

  users.forEach(item => {
    const filtered = {
      expression: item.expression,
      result: item.result,
    };

    if (item.expression.includes("❤️")) {
      loveArr.push(filtered);
    } else {
      flamesArr.push(filtered);
    }
  });

  // console.log("Flames : ",flamesArr);
  // console.log("Love : ",lovePercentageArr);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "40px", padding: "20px" }}>
      {/* Flames Table */}
      <table style={{ borderCollapse: "collapse", textAlign: "center", border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Flames Expression</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Flames Result</th>
          </tr>
        </thead>
        <tbody>
          {flamesArr.length === 0 ? (
            <tr><td colSpan="2" style={{ padding: "8px" }}>No Flames Data</td></tr>
          ) : (
            flamesArr.map(({ expression, result }, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{expression}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{result}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Love Percentage Table */}
      <table style={{ borderCollapse: "collapse", textAlign: "center", border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Love Expression</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Love Result</th>
          </tr>
        </thead>
        <tbody>
          {loveArr.length === 0 ? (
            <tr><td colSpan="2" style={{ padding: "8px" }}>No Love Data</td></tr>
          ) : (
            loveArr.map(({ expression, result }, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid black", padding: "8px" }}>{expression}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{result}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
export default App;