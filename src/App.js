import React, { useState } from "react";
import "./App.css";
import github from "./github-icon.svg";

const url = "https://uploadbeta.com/api/pi/?cached&n=1000000";
var piDigits = "";
var digitsBefore = ""; //the digits before the ones found in Pi
var digitsAfter = ""; //the digits after the ones found in Pi
var output = ""; //the output which is to be displayed
var n = NaN;

// Fetching the Pi digits from the API above.
// Referred from https://helloacm.com/pi/
fetch(url)
  .then((response) => response.json())
  .then((data) => (piDigits = data.substring(2)));

function App() {
  const [input, setInput] = useState("");
  console.log(piDigits);

  function findInPi(input) {
    //Searching for the input digits in PiDigits
    //If found, the value entered is stored in n, else -1 is returned by indexOf
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf

    n = piDigits.indexOf(input);

    digitsAfter = "";
    digitsBefore = "";

    if (n !== -1) {
      //Condition true if the digits are found in the firs 1 Million digits of Pi
      //Considering the 20 digits before and after Pi, just for frontend
      for (var i = 1; i <= 25; i++) {
        digitsBefore += piDigits.charAt(n - i);
        digitsAfter += piDigits.charAt(n + i + input.length - 1);
      }
      digitsBefore = digitsBefore.split("").reverse("").join("");
      output = "..." + digitsBefore + " " + input + " " + digitsAfter + "...";
      console.log(input);
      // console.log(output);
      return output;
    } else {
      return "";
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          findInPi(e.target.value);
          setInput(e.target.value);
        }}
        className="input"
        placeholder="Enter string"
        name="input"
      />

      <div className="output">
        {output === "" ? (
          <p>Not Found!</p>
        ) : (
          <div>
            {n === -1 ? (
              <p>
                This string does not occur in the first 1 Million digits of Pi!
              </p>
            ) : (
              <p>
                This string occurs at location{" "}
                <span style={{ color: " #222f3e" }}>{n + 1}</span>
              </p>
            )}

            <p>
              {"..." + digitsBefore}{" "}
              <span style={{ color: " #222f3e" }}>{input}</span>{" "}
              {digitsAfter + "..."}
            </p>
          </div>
        )}
        <p className="info">
          Searches from the first digit after the decimal point
        </p>
      </div>
      <div className="footer">
        <a href="https://github.com/praaatik/pi-peekaboo">
          <img
            src={github}
            width="30px"
            height="30px"
            className="github-icon"
            alt="github-icon-for-repo"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
