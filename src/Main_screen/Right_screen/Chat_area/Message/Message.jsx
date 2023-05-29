import "./Message.css";

import React from "react";
import ReactDOM from "react-dom/client";

function Message(props, key) {
  if (props.who == "mine") {
    return (
      <>
        <div className={props.who + " message_row" + props.Mode} key={key} id={key}>
          <div className=" message">
            <span className="bubble_time">{props.time}</span>
            <span className="bubble_info">{props.msg}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={props.who + " message_row"  + props.Mode} key={key} id={key}>
        <div className=" message">
          <span className="bubble_info">{props.msg}</span>
          <span className="bubble_time">{props.time}</span>
        </div>
      </div>
    </>
  );
}

export default Message;
