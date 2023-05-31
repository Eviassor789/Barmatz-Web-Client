import "./Input_area.css";
import users from "../../../Users_data/Users";

import { useRef, useState, useEffect } from "react";

function Input_area(props) {
  const input_area = useRef(null);
  const input = useRef(null);
  const btn_ref = useRef(null);
  const [hasListener, SethasListener] = useState(false);

  function PressEnter(event) {
    if (props.CurrentChat != "") {
      // If the user presses the "Enter" key on the keyboard
      if (event.key == "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        btn_ref.current.click();
      }
    }
  }
  // console.log("01 hasListener[1] " + hasListener[1]);
  // console.log("02 props.CurrentChat " + props.CurrentChat);

  // if (hasListener[1] <= 0 && props.CurrentChat > 0)
  //   input.current.addEventListener("keypress", PressEnter);



  useEffect(() => {
    console.log("04 props.CurrentChat " + props.CurrentChat);
    if (props.CurrentChat > 0) {
      if (!hasListener) {
        input.current.addEventListener("keypress", PressEnter);
        SethasListener(true);
      }
    }
    // if (hasListener[1] != props.CurrentChat)
    //   SethasListener([true, props.CurrentChat]);

    if (props.CurrentChat <= 0)
      SethasListener(false);

    // if (hasListener[1] == 0 && props.CurrentChat <= 0 && hasListener[0] == true)
    //   SethasListener([false, props.CurrentChat]);
  });

  function Send_msg() {
    if (input.current.value == "") {
      return;
    }
    if (input.current.value.split(" ").join("") == "") {
      return;
    }

    (async () => {
      const data = { msg: input.current.value };

      console.log("fetch in Input_area");
      await fetch(
        "http://localhost:5000/api/Chats/" + props.CurrentChat + "/Messages",
        {
          method: "post",
          headers: {
            accept: "*/*",
            Authorization: "bearer " + props.LoggedUser_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      ).then(async (res) => {
        // if(res.status == 401){
        //   window.location.href = "/";
        // }
        if (res.status == 200) {
          props.setState(!props.state);
          input.current.value = "";
          // input.current.removeEventListener("keypress", PressEnter);
        }
      });
    })();



    // let currDate = new Date();
    // let H = currDate.getHours();
    // let M = currDate.getMinutes();

    // if (currDate.getHours() < 10) {
    //   H = "0" + currDate.getHours();
    // }
    // if (currDate.getMinutes() < 10) {
    //   M = "0" + currDate.getMinutes();
    // }
    // let NowTime = H + ":" + M;

    // users
    //   .get(props.LoggedUser)
    //   .AddNewMsgTo(props.CurrentFriend, input.current.value, NowTime);

    //   if(props.LoggedUser != props.CurrentFriend){
    //     users
    //     .get(props.CurrentFriend)
    //     .AddNewMsgFrom(props.LoggedUser, input.current.value, NowTime);
    //   }
  }

  if (props.CurrentChat <= 0) {
    return <div id="input_area" className={props.Mode} ref={input_area}></div>;
  } else {
    return (
      <div id="input_area" className={props.Mode} ref={input_area}>
        <input
          className="col-9 col-xl-11 col-lg-10 col-md-10 col-sm-10"
          type="text"
          placeholder="New message here..."
          ref={input}
        ></input>
        <button
          className="btn btn-primary"
          onClick={() => {
            Send_msg();
          }}
          ref={btn_ref}
        >
          <i className="bi bi-send"></i>
        </button>
      </div>
    );
  }
}

export default Input_area;
