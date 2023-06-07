import "./New_contact_modal.css";
import users from "../../../Users_data/Users";
import { useRef, useEffect } from "react";
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";


function New_contact_modal(props) {

  const contactInput = useRef(null);
  const close = useRef(null);
  const btn = useRef(null);

  function PressEnter(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key == "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      btn.current.click();
    }
  }

  function cleanError() {
    document.getElementById("errorsModals").innerHTML = "";
  }

  useEffect(() => {
      contactInput.current.addEventListener("keypress", PressEnter);
  },[]);

  async function addContact() {

    const data = {
      username: contactInput.current.value,
    };

    console.log("fetch in New_contact_modal");
    await fetch("http://localhost:5000/api/Chats", {
      method: "post",
      headers: {
        accept: "*/*",
        Authorization: "bearer " + props.LoggedUser_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      // if(res.status == 401){
      //   window.location.href = "/";
      // }
      if (res.status != 200) {
        document.getElementById("errorsModals").innerHTML =
          "&ensp;no such contact";
        contactInput.current.addEventListener("input", cleanError);
        return;
      }
      var name = contactInput.current.value;
      contactInput.current.value = "";
      close.current.click();
    });

    // if(users.get(name) == null ) {
    //   document.getElementById("errorsModals").innerHTML = "&ensp;no such contact"
    //   contactInput.current.addEventListener("input", cleanError);
    //   return;
    // }

    // if (users.get(props.LoggedUser).IsYourFriend(name)) {
    //   document.getElementById("errorsModals").innerHTML = "&ensp;contact is already your friend";
    //   contactInput.current.addEventListener("input", cleanError);
    //   return;
    // }
    // users.get(name).AddNewFriend(props.LoggedUser);
    // users.get(props.LoggedUser).AddNewFriend(name);

    const socket = io.connect("http://localhost:3333");
    socket.emit("add_chat", contactInput.current.value);

    props.setState(!props.state);
  }

  return (
    <>
      <div
        className="modal fade"
        id="add_new_contact_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add new contact
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={close}
                onClick={() => {
                  cleanError();
                  contactInput.current.removeEventListener('keypress', PressEnter);
                }
              }
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Enter contact's name"
                ref={contactInput}
                id="contactInput"
              ></input>
              <div id="errorsModals"></div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="cancel"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  cleanError();
                  contactInput.current.removeEventListener('keypress', PressEnter);

                }
              }
              >
                Cancel
              </button>
              <button
                ref={btn}
                type="button"
                id="add"
                className="btn btn-warning"
                onClick={addContact}
              >
                Add contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default New_contact_modal;

