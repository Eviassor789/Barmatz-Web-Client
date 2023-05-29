import "./My_name_area.css";
import users from "../../../Users_data/Users";
import Register from "../../../Register/Register";
import { useRef, useEffect } from "react";


function My_name_area(props) {
  let imagesArray2 = [];


  return (
    <>

      <div id="my_name_area" className={props.Mode}>
        <img src={users.get(props.LoggedUser).getPicture()} alt="" ></img>

        <span id="my_name" className={props.Mode}>{users.get(props.LoggedUser).getNickname()}</span>
        <button
          id="add_button"
          type="button"
          className="btn btn-dark btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#add_new_contact_modal"
          aria-hidden="true"
          onClick= {() => {
            document.getElementById("errorsModals").innerHTML = "";
            document.getElementById("contactInput").value = "";
          }}
        >
          <i className="bi bi-person-fill-add"></i>
        </button>
      </div>
    </>
  );
}

export default My_name_area;
