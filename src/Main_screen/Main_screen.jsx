import "./Main_screen.css";
import React, { useState } from "react";
import Left_screen from "./Left_screen/Left_screen";
import Right_screen from "./Right_screen/Right_screen";

function Main_screen(props) {
  const [CurrentChat, SetCurrentChat] = useState(0);
  const [CurrentUser, SetCurrentUser] = useState({});
  const [state, RENDER] = useState(true);

  var logged = props.LoggedUser;
  
  // works in refresh
  // if (logged == "") {
  //   window.location.href = "/";
  // }

  function left(id) {
    SetCurrentChat(id);
  }

   

  return (
    <>
      <Left_screen
        LoggedUser={logged}
        SetCurrentChat={SetCurrentChat}
        CurrentChat={CurrentChat}
        SetCurrentUser={SetCurrentUser}
        setState={RENDER}
        state={state}
        Mode={props.Mode}
        LoggedUser_token={props.LoggedUser_token}
        left = {left}

      />
      <Right_screen
        CurrentUser={CurrentUser}
        LoggedUser={logged}
        CurrentChat={CurrentChat}
        setState={RENDER}
        state={state}
        Mode={props.Mode}
        SetMode={props.SetMode}
        LoggedUser_token={props.LoggedUser_token}
        SetLoggedUser_token={props.SetLoggedUser_token}
      />
    </>
  );
}

export default Main_screen;
