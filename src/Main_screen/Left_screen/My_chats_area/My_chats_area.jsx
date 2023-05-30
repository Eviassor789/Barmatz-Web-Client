import users from "../../../Users_data/Users";
import "./My_chats_area.css";
import Chat_tile from "./Chat_tile/Chat_tile";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function My_chats_area(props) {

  const Exit_link = useRef(null);
  const [chats_items, Setchats_items] = useState("");

  var i = "<div></div>"

  async function big() {
    var data;

    async function func() {
      const res = await fetch("http://localhost:5000/api/Chats", {
        method: "Get",
        headers: {
          accept: "application/json",
          Authorization: "bearer " + props.LoggedUser_token,
        },
      });

      if (res.ok && res.status == 200) {
        data = await res.json();
        console.log("data " + JSON.stringify(data));
      } else {
        console.error("Request failed with status:", res.status);
      }
    }

    await func();

    // if (props.CurrentFriend != ""){
    //   users.get(props.LoggedUser).getFriends_Names().forEach(element => {
    //     if (element.Name == props.CurrentFriend){
    //       element.unread = 0;

    //     }
    //   });
    // }

    // console.log(props.LoggedUser + " this");

    if (data != null) {
      console.log("again");
      i = data.map((friend) => (
        <Chat_tile
          img={friend.user.profilePic}
          Nickname={friend.user.displayName}
          Name={friend.user.username}
          key={friend.id}
          CurrentFriend={props.CurrentFriend}
          unread={0}
          last={friend.lastMessage ? friend.lastMessage : ""}
          date="25:00"
          SetCurrentFriend={props.SetCurrentFriend}
          LoggedUser={props.LoggedUser}
        />
        // <div>OOO</div>
      ));
      Setchats_items(i);
    }
    console.log("01 chats_items ");
  }
  big();
  console.log("02 chats_items ");

  return (
    <>
      {chats_items}
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