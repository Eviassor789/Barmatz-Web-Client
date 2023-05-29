import "./New_contact_modal.css";
import users from "../../../Users_data/Users";
import { useRef, useEffect } from "react";

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
    document.getElementById("errorsModals").innerHTML = ""
  }

  useEffect(() => {
    contactInput.current.addEventListener("keypress", function (event) {
      PressEnter(event);
    });
  });

  function addContact() {
    var name = contactInput.current.value;
    if(users.get(name) == null ) {
      document.getElementById("errorsModals").innerHTML = "&ensp;no such contact"
      contactInput.current.addEventListener("input", cleanError);
      return;
    }

    if (users.get(props.LoggedUser).IsYourFriend(name)) {
      document.getElementById("errorsModals").innerHTML = "&ensp;contact is already your friend";
      contactInput.current.addEventListener("input", cleanError);
      return;
    }
    users.get(name).AddNewFriend(props.LoggedUser);
    users.get(props.LoggedUser).AddNewFriend(name);
    contactInput.current.value = "";
    close.current.click()

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
                onClick={cleanError}
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
                onClick={cleanError}
              >
                Cancel
              </button>
              <button
              ref={btn}
                type="button"
                id="add"
                className="btn btn-warning"
                onClick={() => {
                  addContact();
                }}
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
