import "./Corrent_chat_name_area.css";
import users from "../../../Users_data/Users";
import { Link } from "react-router-dom";

function Corrent_chat_name_area(props) {
  const handle_click = () => {
    props.Mode == "" ? props.SetMode(" light_mode ") : props.SetMode("");
    users.get(props.LoggedUser).setLight_mode();
    console.log("color");
  };

  users.get(props.LoggedUser).getLight_mode()? props.SetMode(" light_mode ") : props.SetMode("");

  if (props.CurrentFriend == "") {

    return (
      <>
        <div id="corrent_chat_name_area" className={props.Mode}>
          <span className="friend_name col"></span>
          <button id="sun" onClick={handle_click} className="btn color btn-lg btn-dark">
          <i className="bi bi-brightness-high-fill" onAbort={handle_click}></i>
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
          <img src={users.get(props.CurrentFriend).getPicture()}></img>
          <span className="friend_name col">
            {props.CurrentFriend==props.LoggedUser?"You": users.get(props.CurrentFriend).getNickname()}
          </span>
          <button id="sun" onClick={handle_click} className="btn color btn-lg btn-dark">
          <i className="bi bi-brightness-high-fill" onAbort={handle_click}></i>
          </button>
          <Link to="/">
            <button id="log" className="btn btn-lg logout btn-dark">
              <i className="bi bi-box-arrow-right"></i>
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default Corrent_chat_name_area;
