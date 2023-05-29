import "./Chat_tile.css";
import { useState } from "react";


function Chat_tile(props, key) {

  var active_tile = ""
  
  function handleClick() {
    active_tile = " active"
  }

  const SetCurrentFriend = () => {
    props.SetCurrentFriend(props.Name);
    console.log(props.Name + " is watched");
    handleClick()
    
  };


  props.CurrentFriend==props.Name? active_tile=" active ":active_tile=""

  return (
    <>
      <div className={"chat_tile " + active_tile} key={key} onClick={SetCurrentFriend}>
        <img id="others_profile" src={props.img}></img>
        <div className="friend_name_and_last col">
          <span>{props.Name==props.LoggedUser? "You": props.Nickname}</span>
          <p className="last_msg">{props.last}</p>
        </div>
        <span class={props.unread != 0?"circle ":"" }>{props.unread != 0?props.unread:""}</span>
        <span className="friend_time col-2">{props.date}</span>
      </div>
    </>
  );
}

export default Chat_tile;
