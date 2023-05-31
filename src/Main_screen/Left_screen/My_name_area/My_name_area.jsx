import "./My_name_area.css";
import users from "../../../Users_data/Users";
import Register from "../../../Register/Register";
import { useRef, useEffect, useState } from "react";

function My_name_area(props) {
  const [my_name_pic, set_my_name_pic] = useState([]);

  // const data = {
  //   "username": Name_input.current.value,
  //   "password": Password_input.current.value,
  // };

  console.log("my_name " + my_name_pic[0]);
  // if (my_name == "") {
  (async () => {
    console.log("fetch in My_name_area");
    await fetch("http://localhost:5000/api/Users/" + props.LoggedUser, {
      method: "Get",
      headers: {
        accept: "application/json",
        Authorization: "bearer " + props.LoggedUser_token,
      },
    }).then(async (res) => {
      // if((res.status == 401)){
      //   window.location.href = "/";
      // }
      var data;
      if (res.ok && res.status == 200) {
        data = await res.json();

        if (
          JSON.stringify(data.displayName) != JSON.stringify(my_name_pic[0]) ||
          JSON.stringify(data.profilePic) != JSON.stringify(my_name_pic[1])
        )
          set_my_name_pic([data.displayName, data.profilePic]);
      } else {
        console.error("Request failed with status:", res.status);
      }
    });
  })();
  // }
  return (
    <>
      <div id="my_name_area" className={props.Mode}>
        {/* <img src={users.get(props.LoggedUser).getPicture()} alt="" ></img> */}
        {/* <div id="image-container"> */}
        <img src={my_name_pic[1]} alt=""></img>
        {/* </div> */}

        {/* <span id="my_name" className={props.Mode}>{users.get(props.LoggedUser).getNickname()}</span> */}
        <span id="my_name" className={props.Mode}>
          {my_name_pic[0]}
        </span>
        <button
          id="add_button"
          type="button"
          className="btn btn-dark btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#add_new_contact_modal"
          aria-hidden="true"
          onClick={() => {
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
