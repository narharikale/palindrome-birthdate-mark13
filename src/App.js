import { useState } from "react";
import "./styles.css";
import bday from "./birthday.png";

let dateInput = "";
const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function App() {
  const [output, setOutput] = useState("Output will appear here");

  function onClickHandler() {
    if (dateInput) {
      setOutput(
        <img
          alt="broken"
          src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif"
          width="150px"
          height="90px"
        />
      );

      setTimeout(() => {
        checkPalindromeDate();
      }, 3500);
    } else {
      setOutput("Please enter date");
    }
  }

  function checkPalindromeDate() {
    var datearray = dateInput.split("-");
    console.log(datearray);
    var year = datearray[0];
    var month = datearray[1];
    var day = datearray[2];
    let palindrome = allFormats(year, month, day);

    if (palindrome) {
      var result = "Yes your birthdate is palindrome number " + palindrome;
    } else {
      let [nexd, diff] = nextPlindrome(day, month, year);
      result =
        "No you birthdate is not palindrome, and Next palindrome date " +
        nexd +
        " you missed it by " +
        diff +
        " days ";
    }
    setOutput(result);
  }

  function allFormats(yyyy, mm, dd) {
    const dateFormat1 = yyyy + mm + dd;

    const dateFormat2 = dd + mm + yyyy;

    const dateFormat3 = mm + dd + yyyy.substring(2);

    const dateFormat4 = Number(mm) + dd + yyyy;

    if (checkPalindrome(dateFormat1)) {
      return " with format  yyyy-mm-dd is " + `${yyyy}-${mm}-${dd}`;
    } else if (checkPalindrome(dateFormat2)) {
      return " with format  dd-mm-yyyy is " + `${dd}-${mm}-${yyyy}`;
    } else if (checkPalindrome(dateFormat3)) {
      return " with format  mm-dd-yy is " + `${mm}-${dd}-${yyyy.substring(2)}`;
    } else if (checkPalindrome(dateFormat4)) {
      return " with format  m-dd-yyyy is " + `${Number(mm)}-${dd}-${yyyy}`;
    } else {
      return null;
    }
  }

  function checkPalindrome(dateCheck) {
    let reverse = dateCheck.split("").reverse("").join("");

    return reverse === dateCheck;
  }

  function nextPlindrome(date, month, year) {
    let ddNo1 = Number(date);
    let mmNo1 = Number(month);
    let yyNo1 = Number(year);
    let ddNo2 = Number(date);
    let mmNo2 = Number(month);
    let yyNo2 = Number(year);

    for (let i = 1; i > 0; i++) {
      ddNo1 = ddNo1 + 1;
      if (ddNo1 > Number(datesInMonth[mmNo1 - 1])) {
        ddNo1 = 1;
        mmNo1 = mmNo1 + 1;
        if (mmNo1 > 12) {
          mmNo1 = 1;
          yyNo1 = yyNo1 + 1;
        }
      }
      let yyString = yyNo1.toString();
      let mmString = mmNo1.toString();
      let ddString = ddNo1.toString();
      if (mmString.length == 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length == 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = allFormats(yyString, mmString, ddString);
      if (setFlagNextDate) {
        console.log(setFlagNextDate);
        return [setFlagNextDate, i];
      }

      if (yyNo2 > 1) {
        ddNo2 = ddNo2 - 1;
        if (ddNo2 < 1) {
          mmNo2 = mmNo2 - 1;
          if (mmNo2 < 1) {
            mmNo2 = 12;
            yyNo2 = yyNo2 - 1;
            if (yyNo2 < 1) {
              break;
            }
            ddNo2 = datesInMonth[mmNo2 - 1];
          }
        }
        let yyString = yyNo2.toString();
        let mmString = mmNo2.toString();
        let ddString = ddNo2.toString();
        if (mmString.length == 1) {
          mmString = "0" + mmString;
        }
        if (ddString.length == 1) {
          ddString = "0" + ddString;
        }
        let setFlagNextDate = allFormats(yyString, mmString, ddString);
        if (setFlagNextDate) {
          return [setFlagNextDate, i];
        }
      }
    }
  }

  return (
    <div className="App">
      <div
        className="main"
        style={{ backgroundImage: `url('${bday}')`, backgroundSize: "cover" }}
      >
        <div className="GitDiv">
          <a style={{ color: "black" }} href="https://github.com/narharikale">
            <i class="lni lni-github-original social-links"></i>
          </a>
        </div>

        <section>
          <h2>
            Enter your Birthdate to check whether it is palindrome or not ?
          </h2>
          <small>
            This app checks your birthdate in 4 formats yyyy-mm-dd, dd-mm-yyyy,
            mm-dd-yy, m-dd-yyyy e.g. if your birthdate is 02 July 1998, then app
            will check for 19980702, 02071998, 070298, 2071998
          </small>
          <input
            type="date"
            onChange={(e) => {
              dateInput = e.target.value;
            }}
          />
          <button onClick={onClickHandler}>Check</button>

          <div className="output">{output}</div>
        </section>
      </div>
    </div>
  );
}
