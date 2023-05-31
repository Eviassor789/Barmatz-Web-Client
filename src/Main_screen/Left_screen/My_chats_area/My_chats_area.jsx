import users from "../../../Users_data/Users";
import "./My_chats_area.css";
import Chat_tile from "./Chat_tile/Chat_tile";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function My_chats_area(props) {
  const Exit_link = useRef(null);
  const [friend_List, SetFriend_List] = useState("");
  const [chats, Setchats] = useState("");

  var { chat_items } = "<div></div>";

  var data;

  function getTime(string) {
    var secondHalf = string.split("T")[1];
    var time = secondHalf.substring(0, 5);
    return time;
  }

  function getChatsFetch(){
    (async () => {
      console.log("fetch in My_chats area");
      await fetch("http://localhost:5000/api/Chats", {
        method: "Get",
        headers: {
          accept: "application/json",
          Authorization: "bearer " + props.LoggedUser_token,
        },
      })
        .then(async (res) => {
          // if(res.status == 401){
          //   window.location.href = "/";
          // }
          if (res.ok && res.status == 200) {
            data = await res.json();
          } else {
            console.error("Request failed with status:", res.status);
          }
        })
        .then(() => {
          if (data != null) {
            chat_items = data.map((friend) => (
              <Chat_tile
                img={friend.user.profilePic}
                Nickname={friend.user.displayName}
                Name={friend.user.username}
                ID={friend.id}
                CurrentChat={props.CurrentChat}
                unread={0}
                last={friend.lastMessage ? friend.lastMessage.content : ""}
                date={
                  friend.lastMessage ? getTime(friend.lastMessage.created) : ""
                }
                SetCurrentChat={props.SetCurrentChat}
                LoggedUser={props.LoggedUser}
                left={props.left}
                Mode={props.Mode}
                SetCurrentUser={props.SetCurrentUser}
                LoggedUser_token={props.LoggedUser_token}
              />
            ));
          }
        })
        .then(() => {
          if (!(JSON.stringify(chats) == JSON.stringify(chat_items))) {
            SetFriend_List(data);
            Setchats(chat_items);
          }
        });
    })();
  }

  // if (props.CurrentChat == 0) {
    getChatsFetch();
  // }




  // if (props.CurrentFriend != ""){
  //   users.get(props.LoggedUser).getFriends_Names().forEach(element => {
  //     if (element.Name == props.CurrentFriend){
  //       element.unread = 0;

  //     }
  //   });
  // }

  return (
    <div id="My_chats_area">
      {chats}
      <Link id="exit" to="/" ref={Exit_link}></Link>
    </div>
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
