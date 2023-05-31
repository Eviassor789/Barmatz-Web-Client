import "./Corrent_chat_name_area.css";
import users from "../../../Users_data/Users";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

function Corrent_chat_name_area(props) {
  const [name_nick_pic, Setname_nick_pic] = useState([]);

  const handle_click = () => {
    props.Mode == "" ? props.SetMode(" light_mode ") : props.SetMode("");
    // users.get(props.LoggedUser).setLight_mode();
  };

  var data;
  // var res;
  if (props.CurrentUser != name_nick_pic[0] && props.CurrentChat > 0) {
    (async () => {
      console.log("fetch in corrent_chat_name_area");
      await fetch("http://localhost:5000/api/Chats/" + props.CurrentChat, {
        method: "Get",
        headers: {
          accept: "application/json",
          Authorization: "bearer " + props.LoggedUser_token,
        },
      })
        .then(async (res) => {
          if(res.status == 401){
            window.location.href = "/";
          }
          if (res.ok && res.status == 200) {
            data = await res.json();
          } else {
            console.error("Request failed with status:", res.status);
          }
        })
        .then(() => {
          if (
            data != null &&
            !(JSON.stringify(name_nick_pic) == JSON.stringify(data))
          ) {
            data.users[0].username == props.LoggedUser
              ? Setname_nick_pic([props.CurrentUser, data.users[1].displayName, data.users[1].profilePic])
              : Setname_nick_pic([props.CurrentUser, data.users[0].displayName, data.users[0].profilePic]);
          }
        });
    })();
  }

  // users.get(props.LoggedUser).getLight_mode()? props.SetMode(" light_mode ") : props.SetMode("");
  // props.SetMode("");

  if (props.CurrentChat <= 0) {
    return (
      <>
        <div id="corrent_chat_name_area" className={props.Mode}>
          <span className="friend_name col"></span>
          <button
            id="sun"
            onClick={handle_click}
            className="btn color btn-lg btn-dark"
          >
            <i
              className="bi bi-brightness-high-fill"
              onAbort={handle_click}
            ></i>
          </button>
          <Link to="/">
            <button id="log" className="btn btn-lg logout btn-dark">
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="corrent_chat_name_area" className={props.Mode}>
          <img src={name_nick_pic[2]}></img>
          <span className="friend_name col">{name_nick_pic[1]}</span>
          <button
            id="sun"
            onClick={handle_click}
            className="btn color btn-lg btn-dark"
          >
            <i
              className="bi bi-brightness-high-fill"
              onAbort={handle_click}
            ></i>
          </button>
          <Link to="/">
            <button id="log" className="btn btn-lg logout btn-dark" onClick={() => {
              props.SetLoggedUser_token("");
            }}>
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default Corrent_chat_name_area;
