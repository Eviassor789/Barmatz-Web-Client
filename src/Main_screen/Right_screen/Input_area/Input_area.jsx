import "./Input_area.css";
import users from "../../../Users_data/Users";

import { useRef, useState, useEffect } from "react";

function Input_area(props) {
  const input_area = useRef(null);
  const input = useRef(null);
  const btn_ref = useRef(null);

  useEffect(() => {
    if (props.CurrentFriend != "") {
      input.current.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key == "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          btn_ref.current.click();
        }
      });
    }
  });

  function Send_msg() {
    if (input.current.value == "") {
      return;
    }
    if (input.current.value.split(" ").join("") == "") {
      return;
    }

    let currDate = new Date();
    let H = currDate.getHours();
    let M = currDate.getMinutes();

    if (currDate.getHours() < 10) {
      H = "0" + currDate.getHours();
    }
    if (currDate.getMinutes() < 10) {
      M = "0" + currDate.getMinutes();
    }
    let NowTime = H + ":" + M;

    users
      .get(props.LoggedUser)
      .AddNewMsgTo(props.CurrentFriend, input.current.value, NowTime);

      if(props.LoggedUser != props.CurrentFriend){
        users
        .get(props.CurrentFriend)
        .AddNewMsgFrom(props.LoggedUser, input.current.value, NowTime);
      }


    props.setState(!props.state);
    input.current.value = "";
    console.log(props.state);
  }

  if (props.CurrentFriend == "") {
    console.log("press on tile or add friend");
    return <div id="input_area" class ={props.Mode} ref={input_area}></div>;
  } else {
    console.log("you are ready to chat");
    return (
      <div id="input_area" class ={props.Mode} ref={input_area}>
        <input
          className="col-9 col-xl-11 col-lg-10 col-md-10 col-sm-10"
          type="text"
          placeholder="New message here..."
          ref={input}
        ></input>
        <button className="btn btn-primary" onClick={Send_msg} ref={btn_ref}>
          <i className="bi bi-send"></i>
        </button>
      </div>
    );
  }
}

export default Input_area;
