import "./Right_screen.css";
import Corrent_chat_name_area from "./Corrent_chat_name_area/Corrent_chat_name_area";
import Chat_area from "./Chat_area/Chat_area";
import Input_area from "./Input_area/Input_area";
import { useState } from "react";

function Right_screen(props) {

  return (
    <>
      <div id="right_screen" className="col col-8">
        <Corrent_chat_name_area
          CurrentFriend={props.CurrentFriend}
          Mode={props.Mode}
          SetMode={props.SetMode}
          LoggedUser={props.LoggedUser}
        />
        <Chat_area
          LoggedUser={props.LoggedUser}
          CurrentFriend={props.CurrentFriend}
          Mode={props.Mode}
        />
        <Input_area
          setState={props.setState}
          state={props.state}
          LoggedUser={props.LoggedUser}
          CurrentFriend={props.CurrentFriend}
          Mode={props.Mode}
        />
      </div>
    </>
  );
}

export default Right_screen;
