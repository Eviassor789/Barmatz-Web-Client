import users from "../../../Users_data/Users";
import "./My_chats_area.css";
import Chat_tile from "./Chat_tile/Chat_tile";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function My_chats_area(props) {

  const Exit_link = useRef(null);

  // works in refresh
  if (props.LoggedUser == "") {
    window.location.href = "/";
  }

  if (props.CurrentFriend != ""){
    users.get(props.LoggedUser).getFriends_Names().forEach(element => {
      if (element.Name == props.CurrentFriend){
        element.unread = 0;
        
      }
    });
  }

  var chats_items = "<div></div>";

  console.log(props.LoggedUser + " this");


  if (users.get(props.LoggedUser) != null) {
    if (users.get(props.LoggedUser).Friends_Chat_List != null) {
      chats_items = users.get(props.LoggedUser).getFriends_Names().map((friend) => (
        <Chat_tile
          img={users.get(friend.Name).getPicture()}
          Nickname={users.get(friend.Name).getNickname()}
          Name={users.get(friend.Name).getName()}
          key={friend.Name}
          CurrentFriend={props.CurrentFriend}
          unread={friend.unread}
          last={
            users.get(friend.Name).isChatWith(props.LoggedUser)
              ? users.get(friend.Name).getLastMsgFrom(props.LoggedUser)
              : ""
          }
          date={
            users.get(friend.Name).isChatWith(props.LoggedUser)
              ? users.get(friend.Name).getLastTimeFrom(props.LoggedUser)
              : ""
          }
          SetCurrentFriend={props.SetCurrentFriend}
          LoggedUser={props.LoggedUser}
          
        />
      ));
    }
  }

  return (
    <>
      {chats_items}
      <Link id="exit" to="/" ref={Exit_link}></Link>
    </>
  );
}

export default My_chats_area;
