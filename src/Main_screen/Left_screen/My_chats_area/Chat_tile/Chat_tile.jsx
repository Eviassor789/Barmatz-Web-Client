import "./Chat_tile.css";
import { useEffect, useState } from "react";


function Chat_tile(props) {

  const [render, Setrender] = useState(true);

  var active_tile = "";
  // const [active_tile, Setactive_tile] = useState("");
  
  // useEffect(() => {
  //   document.getElementById("delete_friend").innerHTML = "";
  // }) 
  
  

  function handleClick() {
    active_tile = " active";

  }

  const SetCurrentChatt = (event) => {
    console.log("show " + props.CurrentChat)

    if(document.getElementById("trash").contains(event.target)){
      return;
    }

    // document.getElementById("trash").innerHTML = '<p id="delete_friend" className="delete_friend col-2"><button className="btn btn-dark trash" onClick={delete_chat}><i className="bi bi-trash-fill"></i></button></p>';


    props.SetCurrentChat(props.ID);
    props.SetCurrentUser(props.Name);

    props.left(props.ID);

    handleClick()
    
  };

  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function delete_chat() {
    console.log("delete")

    console.log("fetch in chat_tile");
      await fetch(
        "http://localhost:5000/api/Chats/" + props.ID,
        {
          method: "DELETE",
          headers: {
            "accept": "*/*",
            "Authorization": "bearer " + props.LoggedUser_token,
          },
        }
      ).catch((err) => {
        console.error("error in delete");
      })
      var temp = props.CurrentChat==0? -1 : 0;
      props.SetCurrentChat(temp);
      console.log("render");
      Setrender(!render);
      sleep(50);
  }



  props.CurrentChat==props.ID ? active_tile=" active ": active_tile="";

  return (
    <div>
      <div
        className={"chat_tile " + active_tile + props.Mode}
        key={props.ID}
        onClick={SetCurrentChatt}
      >
        <img id="others_profile" src={props.img}></img>
        <div className="friend_name_and_last col">
          <span>{props.Name == props.LoggedUser ? "You" : props.Nickname}</span>
          <p className="last_msg">{props.last}</p>
        </div>
        <span className={props.unread != 0 ? "circle " : ""}>
          {props.unread != 0 ? props.unread : ""}
        </span>
          <div id="trash" className="trash_and_time">
            <p className="friend_time col-2">{props.date}</p>
            <p id="delete_friend" className="delete_friend col-2">
              <button className="btn btn-dark trash" onClick={delete_chat}>
                <i className="bi bi-trash-fill"></i>
              </button>
            </p>
          </div>
      </div>
    </div>
  );
}

export default Chat_tile;
