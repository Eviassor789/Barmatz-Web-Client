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

  var data;
  var temp = [];
  var { msg_items } = "<div></div>";
  const [list, Setlist] = useState([]);

  function getTime(string) {
    var secondHalf = string.split("T")[1];
    var time = secondHalf.substring(0, 5);
    return time;
  }

  if (props.CurrentChat > 0) {
    (async () => {
      console.log("fetch in Chat_area");
      await fetch(
        "http://localhost:5000/api/Chats/" + props.CurrentChat + "/Messages",
        {
          method: "Get",
          headers: {
            accept: "application/json",
            Authorization: "bearer " + props.LoggedUser_token,
          },
        }
      )
        .then(async (res) => {
          // if(res.status == 401){
          //   window.location.href = "/";
          // }
          if (res.ok && res.status == 200) {
            data = await res.json();
            console.log("data " + JSON.stringify(data));
            await data.sort((a, b) => a.id - b.id);
          } else {
            console.error("Request failed with status:", res.status);
          }
        })
        .then(async () => {
          if (data != null) {
            temp = await data.map((msg, key) => {
              return (
                <Message
                  who={
                    msg.sender.username == props.LoggedUser ? "mine" : "yours"
                  }
                  time={getTime(msg.created)}
                  msg={msg.content}
                  ID={msg.id}
                  key={msg.id}
                  Mode={props.Mode}
                />
              );
            });
            console.log("temp " + JSON.stringify(temp));
            console.log("JSON.stringify(list) " + JSON.stringify(list));
            temp.reverse();
            if (JSON.stringify(temp) != JSON.stringify(list))
              Setlist(temp);
          }
        });
    })();
  }

  // if (props.CurrentChat != "") {
  //   if (
  //     users.get(props.LoggedUser).getFriend_Chat_List(props.CurrentChat).length >= 1
  //   ) {
  //     msg_items = users
  //       .get(props.LoggedUser)
  //       .getFriend_Chat_List(props.CurrentChat)
  //       .map((msg, key) => (
  //         <Message
  //           who={msg.from == props.LoggedUser ? "mine" : "yours"}
  //           time={msg.time}
  //           msg={msg.text}
  //           key={key}
  //           Mode={props.Mode}
  //         />
  //       ));
  //   }
  // }

  return (
    <div id="chat_area" className={props.Mode}>
      {props.CurrentChat <= 0 ? "" :list}
    </div>
  );
}

export default Chat_area;
