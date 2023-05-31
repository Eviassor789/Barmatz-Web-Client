import "./Login.css";
import users from "../Users_data/Users";

import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

function Login(props) {
  const Name_input = useRef(null);
  const Password_input = useRef(null);
  const Enter_link = useRef(null);
  const btn = useRef(null);

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
  });

  const cleanIncorrect = function () {
    var incorrect2 = document.getElementById("incorrect");
    incorrect2.innerHTML = "";
  }

  const validation = async function () {
    var incorrect = document.getElementById("incorrect");
    if (Name_input.current.value == "" || Password_input.current.value == "") {
      incorrect.innerHTML = "please fill all fields";
      Name_input.current.addEventListener("input", cleanIncorrect);
      Password_input.current.addEventListener("input", cleanIncorrect);
      return;
    }

    const data_for_token = {
      "username": Name_input.current.value,
      "password": Password_input.current.value,
    };

      console.log("fetch in Login");
      const res_for_token = await fetch("http://localhost:5000/api/Tokens", {
      method: "post",
      headers: {  "accept": "*/*",
                  "Content-Type": "application/json" },
      body: JSON.stringify(data_for_token),
    });
    
    const token = await res_for_token.text();
    console.log("res_for_token " + token);
    
    if (res_for_token.status != 200) {
      incorrect.innerHTML = "username or password are incorrect";
      Name_input.current.addEventListener("input", cleanIncorrect);
      Password_input.current.addEventListener("input", cleanIncorrect);
      return;
    }
    
    

    await props.SetLoggedUser(Name_input.current.value);

    props.SetLoggedUser_token(token);
    Enter_link.current.click();
    
    // if (users.get(Name_input.current.value) == null) {
    //   console.log("who???");
    //   incorrect.innerHTML = "username or password are incorrect";
    //   Name_input.current.addEventListener("input", cleanIncorrect);
    //   Password_input.current.addEventListener("input", cleanIncorrect);
    //   return; //password or username are incorrect
    // }
    // if (users.get(Name_input.current.value).Password
    //  == Password_input.current.value) {
    //   console.log("yes");
    //   props.SetLoggedUser(Name_input.current.value);
    //   Enter_link.current.click();
    // } else {
    //   incorrect.innerHTML = "username or password are incorrect";
    //   Name_input.current.addEventListener("input", cleanIncorrect);
    //   Password_input.current.addEventListener("input", cleanIncorrect);
    // }
  };


  return (
    <>
      <Link to="/Main_screen" ref={Enter_link}></Link>
      <div id="upperBlockLogin">
        <img id="logo-Login" src="Barmats-Web.png" alt="logo"></img>
      </div>
      <div id="lowerBlock"></div>
      <div id="container">
        <div className="mb-4 row">
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
          </div>
        </div>
        <div className="mb-4 row">
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
            <div id="incorrect"></div>
          </div>
        </div>
        <div className="mb-4 row center">
          <button
            ref={btn}
            id="Login-Btn"
            className="btn btn-success col-sm-4"
            onClick={validation}
          >
            Login
          </button>
          <div className="register">
            Not registered? <Link to="/Register">click here</Link> to register
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
