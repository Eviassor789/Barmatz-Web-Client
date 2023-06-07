import "./Register.css";
import users from "../Users_data/Users";
import User from "../User";

import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

function Register(props) {
  const Name_input = useRef(null);
  const Password_input = useRef(null);
  const Verify_password_input = useRef(null);
  const Nickname_input = useRef(null);
  const Picture_input = useRef(null);
  const Enter_link = useRef(null);
  const btn = useRef(null);
  let imagesArray = [];

  function PressEnter(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key == "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      btn.current.click();
    }
  }

  useEffect(() => {
    Name_input.current.addEventListener("keypress", function (event) {
      PressEnter(event);
    });
    Password_input.current.addEventListener("keypress", function (event) {
      PressEnter(event);
    });
    Verify_password_input.current.addEventListener(
      "keypress",
      function (event) {
        PressEnter(event);
      }
    );
    Nickname_input.current.addEventListener("keypress", function (event) {
      PressEnter(event);
    });
    Picture_input.current.addEventListener("keypress", function (event) {
      PressEnter(event);
    });
  });

  function displayImages() {
    let images = "";
    imagesArray.forEach((image, index) => {
      images = `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                </div>`;
    });
    document.getElementsByTagName("output")[0].innerHTML = images;
  }

  const showRules = function () {
    var rules = document.getElementById("rules");
    rules.innerHTML =
      "Password must be: - 8-15 charcters long<br> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; - have at least one uppercase and lowercase charcters<br>&emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; - contain at least one digit";
  };

  const cleanRules = function () {
    var rules2 = document.getElementById("rules");
    rules2.innerHTML = "";
  };

  const passwordIsValid = function () {
    if (
      Password_input.current.value.length < 8 ||
      Password_input.current.value.length > 15
    ) {
      return false;
    }
    var uppercase = /[A-Z]+/.test(Password_input.current.value);
    var lowercase = /[a-z]+/.test(Password_input.current.value);
    var hasDigit = /[0-9]+/.test(Password_input.current.value);

    if (uppercase == false || lowercase == false) {
      return false;
    }

    if (hasDigit == false) {
      return false;
    }

    return true;
  };

  const cleanEmpty = function () {
    document.getElementById("emptyDiv").innerHTML = "";
    document.getElementById("nameDiv").innerHTML = "";
    document.getElementById("verifyDiv").innerHTML = "";
  };

  const cleanName = function () {
    document.getElementById("nameDiv").innerHTML = "";
    document.getElementById("emptyDiv").innerHTML = "";
    document.getElementById("verifyDiv").innerHTML = "";
  };

  const cleanVerify = function () {
    document.getElementById("verifyDiv").innerHTML = "";
    document.getElementById("emptyDiv").innerHTML = "";
    document.getElementById("nameDiv").innerHTML = "";
  };

  const validation = async function () {
    if (
      Name_input.current.value == "" ||
      Password_input.current.value == "" ||
      Verify_password_input.current.value == "" ||
      Nickname_input.current.value == "" ||
      Picture_input.current.value == ""
    ) {
      console.log("one or more fields are empty");
      document.getElementById("emptyDiv").innerHTML =
        "one or more fields are empty";
      Name_input.current.addEventListener("input", cleanEmpty);
      Password_input.current.addEventListener("input", cleanEmpty);
      Verify_password_input.current.addEventListener("input", cleanEmpty);
      Nickname_input.current.addEventListener("input", cleanEmpty);
      Picture_input.current.addEventListener("input", cleanEmpty);
      return;
    }

    // if (passwordIsValid() == false) {
    //   showRules();
    //   Password_input.current.addEventListener("input", cleanRules);
    //   return;
    // }

    if (Password_input.current.value != Verify_password_input.current.value) {
      console.log("passwords are not identicle");
      document.getElementById("verifyDiv").innerHTML =
        "passwords are not identicle";
      Password_input.current.addEventListener("input", cleanVerify);
      Verify_password_input.current.addEventListener("input", cleanVerify);
      return;
    }

    // function toDataURL(url, callback) {
    //   var xhr = new XMLHttpRequest();
    //   xhr.onload = function() {
    //     var reader = new FileReader();
    //     reader.onloadend = function() {
    //       callback(reader.result);
    //     }
    //     reader.readAsDataURL(xhr.response);
    //   };
    //   xhr.open('GET', url);
    //   xhr.responseType = 'blob';
    //   xhr.send();
    // }
    var picBase64 = {};
    var data = {};
    (() => {
      function convertImageToBase64(file, callback) {
        const reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(file);
      }

      convertImageToBase64(
        Picture_input.current.files[0],
        async function (base64) {
          // Send the base64 string to the server
          picBase64 = base64;

          data = {
            username: Name_input.current.value,
            password: Password_input.current.value,
            displayName: Nickname_input.current.value,
            profilePic: picBase64,
          };
          console.log("fetch in Register");
          const res = await fetch("http://localhost:5000/api/Users", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (res.status == 409) {
            console.log("Name already taken");
            document.getElementById("nameDiv").innerHTML = "Name already taken";
            Name_input.current.addEventListener("input", cleanName);
            return;
          }

          console.log("user added succesfuly!");

          Enter_link.current.click();
        }
      );
    })();

    // toDataURL(URL.createObjectURL(), function(dataUrl) {
    //   picUrl = dataUrl
    // })

    // const data = {
    //   username: Name_input.current.value,
    //   password: Password_input.current.value,
    //   displayName: Nickname_input.current.value,
    //   profilePic: picBase64,
    // };
    // console.log("base64 " + picBase64);

    // DELETE IN THE END
  //   users.set(
  //     Name_input.current.value,
  //     new User({
  //       Name: Name_input.current.value,
  //       Password: Password_input.current.value,
  //       Nickname: Nickname_input.current.value,
  //       Picture: URL.createObjectURL(Picture_input.current.files[0]),
  //     })
  //   );
  };

  return (
    <>
      <Link to="/" ref={Enter_link}></Link>
      <div id="upperBlockRegister">
        <img id="logo-Register" src="Barmats-Web.png" alt="logo"></img>
      </div>
      <div id="lowerBlock"></div>
      <div id="Register-container">
        <div className="row">
          <label htmlFor="inputName" className="col-sm-3 col-form-label">
            Name
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="inputName"
              ref={Name_input}
            ></input>
            <div id="nameDiv"></div>
          </div>
        </div>

        <div className=" row">
          <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
            Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              ref={Password_input}
            ></input>
            <div id="rules"></div>
          </div>
        </div>

        <div className="row">
          <label
            htmlFor="inputVerifyPassword"
            className="col-sm-3 col-form-label verify"
          >
            Verify Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="inputVerifyPassword"
              ref={Verify_password_input}
            ></input>
            <div id="verifyDiv"></div>
          </div>
        </div>

        <div className="row">
          <label htmlFor="inputDisplayName" className="col-sm-3 col-form-label">
            Nickname
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="inputDisplayName"
              ref={Nickname_input}
            ></input>
          </div>
        </div>

        <div className="row">
          <label htmlFor="inputPicture" className="col-sm-3 col-form-label">
            Picture
          </label>
          <div className="col-sm-9">
            <input
              type="file"
              className="form-control"
              id="inputPicture"
              accept="image/*"
              ref={Picture_input}
              onChange={() => {
                const file = Picture_input.current.files;
                imagesArray.push(file[0]);
                displayImages();
              }}
            ></input>
            <div id="emptyDiv"></div>
          </div>
          <output id="Image_div"></output>
        </div>

        <div id="loginBlock" className="mb-4 row">
          <button
            ref={btn}
            id="login"
            className="btn btn-success col-sm-4"
            onClick={validation}
          >
            Sign up
          </button>
          <div className="register">
            Already registered? <Link to="/">click here</Link> to login
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
