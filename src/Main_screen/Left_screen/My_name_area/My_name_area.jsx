import "./My_name_area.css";
import users from "../../../Users_data/Users";
import Register from "../../../Register/Register";
import { useRef, useEffect, useState } from "react";


function My_name_area(props) {

  const [my_name, set_my_name] = useState("");
  const [picSrc, set_picSrc] = useState("");


  // const data = {
  //   "username": Name_input.current.value,
  //   "password": Password_input.current.value,
  // };

  async function func() {
    
    const res = await fetch(
      "http://localhost:5000/api/Users/" + props.LoggedUser,
      {
        method: "Get",
        headers: {
          accept: "application/json",
          Authorization: "bearer " + props.LoggedUser_token,
        },
      }
    );

    var data;
    if (res.ok && res.status == 200) {
      data = await res.json();
      set_picSrc(data.profilePic);
      set_my_name(data.displayName);
      console.log("im here!");
      console.log(data.displayName); // or do whatever you need with the displayName
    } else {
      console.error("Request failed with status:", res.status);
    }
  }

  func();

  return (
    <>

      <div id="my_name_area" className={props.Mode}>
        {/* <img src={users.get(props.LoggedUser).getPicture()} alt="" ></img> */}
        {/* <div id="image-container"> */}
          <img src={picSrc} alt="" ></img>
        {/* </div> */}


        {/* <span id="my_name" className={props.Mode}>{users.get(props.LoggedUser).getNickname()}</span> */}
        <span id="my_name" className={props.Mode}>{my_name}</span>
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
