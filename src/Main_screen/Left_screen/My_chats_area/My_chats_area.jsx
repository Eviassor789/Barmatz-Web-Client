import users from "../../../Users_data/Users";
import "./My_chats_area.css";
import Chat_tile from "./Chat_tile/Chat_tile";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function My_chats_area(props) {
  const Exit_link = useRef(null);
  const [friend_List, SetFriend_List] = useState("");
  const [chats, Setchats] = useState("");

  var chat_items = "<div></div>";

  var data;
  // var res;
  (async () => {
    await fetch("http://localhost:5000/api/Chats", {
      method: "Get",
      headers: {
        accept: "application/json",
        Authorization: "bearer " + props.LoggedUser_token,
      },
    }).then( async (res)=>{
      if (res.ok && res.status == 200) {
        data = await res.json();
        console.log("data " + JSON.stringify(data));
      } else {
        console.error("Request failed with status:", res.status);
      }
    }).then( ()=>{
      if (data != null) {
        console.log("again");
        chat_items = data.map((friend) => (
          <Chat_tile
            img={friend.user.profilePic}
            Nickname={friend.user.displayName}
            Name={friend.user.username}
            key={friend.id}
            CurrentFriend={props.CurrentFriend}
            unread={3}
            last={friend.lastMessage ? friend.lastMessage : ""}
            date="25:00"
            SetCurrentFriend={props.SetCurrentFriend}
            LoggedUser={props.LoggedUser}
          />
        ));
        
      }
    }).then(()=>{
      if(!(JSON.stringify(data) == JSON.stringify(friend_List)) && !(JSON.stringify(chats) == JSON.stringify(chat_items))){
        SetFriend_List(data);
        Setchats(chat_items);
      }
      console.log("chats");
    });

    
  })();

  // if (props.CurrentFriend != ""){
  //   users.get(props.LoggedUser).getFriends_Names().forEach(element => {
  //     if (element.Name == props.CurrentFriend){
  //       element.unread = 0;

  //     }
  //   });
  // }

  // console.log(props.LoggedUser + " this");

  
  // console.log("01 chats_items ");



  return (
    <>
      {chats}
      <Link id="exit" to="/" ref={Exit_link}></Link>
    </>
  );
}

export default My_chats_area;

// if (users.get(props.LoggedUser) != null) {
//   if (data.length > 0) {
//     chats_items = users.get(props.LoggedUser).getFriends_Names().map((friend) => (
//       <Chat_tile
//         img={users.get(friend.Name).getPicture()}
//         Nickname={users.get(friend.Name).getNickname()}
//         Name={users.get(friend.Name).getName()}
//         key={friend.Name}
//         CurrentFriend={props.CurrentFriend}
//         unread={friend.unread}
//         last={
//           users.get(friend.Name).isChatWith(props.LoggedUser)
//             ? users.get(friend.Name).getLastMsgFrom(props.LoggedUser)
//             : ""
//         }
//         date={
//           users.get(friend.Name).isChatWith(props.LoggedUser)
//             ? users.get(friend.Name).getLastTimeFrom(props.LoggedUser)
//             : ""
//         }
//         SetCurrentFriend={props.SetCurrentFriend}
//         LoggedUser={props.LoggedUser}

//       />
//     ));
//   }
// }
