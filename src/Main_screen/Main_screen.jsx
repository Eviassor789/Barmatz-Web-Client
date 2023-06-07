import "./Main_screen.css";
import React, { useEffect, useState } from "react";
import Left_screen from "./Left_screen/Left_screen";
import Right_screen from "./Right_screen/Right_screen";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";


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

  const socket = io.connect("http://localhost:3333");
    socket.on("message_render", function(msg) {
    console.log("yes io io io message_render");
    RENDER(!state);
  });
  socket.on("add_chat_render", function(msg) {
    console.log("yes io io io add_chat_render");
    RENDER(!state);
  });
  socket.on("delete_chat_render", function(msg) {
    console.log("yes io io io delete_chat_render");
    SetCurrentChat(CurrentChat==0? -1 : 0);
  });



  // useEffect (()=> {
  //   socket.on("message_render", function(user) {
  //     if (logged == user) {
  //       RENDER(!state);
  //     }
  //   });
  // }, [socket])

   

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
