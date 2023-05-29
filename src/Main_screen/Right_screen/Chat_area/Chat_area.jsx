import "./Chat_area.css";
import users from "../../../Users_data/Users";

import React, { useEffect, useState } from "react";
import Message from "./Message/Message";
import the_list from "../../../Chats.js";

function Chat_area(props) {
  useEffect(() => {
    var element = document.getElementById("chat_area");
    element.scrollTop = element.scrollHeight;
  });

  var { msg_items } = "<div></div>";
  if (props.CurrentFriend != "") {
    if (
      users.get(props.LoggedUser).getFriend_Chat_List(props.CurrentFriend).length >= 1
    ) {
      msg_items = users
        .get(props.LoggedUser)
        .getFriend_Chat_List(props.CurrentFriend)
        .map((msg, key) => (
          <Message
            who={msg.from == props.LoggedUser ? "mine" : "yours"}
            time={msg.time}
            msg={msg.text}
            key={key}
            Mode={props.Mode}
          />
        ));
    }
  }

  return <div id="chat_area" className={props.Mode}>{msg_items}</div>;
}

export default Chat_area;
