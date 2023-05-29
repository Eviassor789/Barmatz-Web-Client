import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import users from "./Users_data/Users";

import Register from "./Register/Register";
import Main_screen from "./Main_screen/Main_screen";
import Login from "./Login/Login";

function App() {

  console.log("users: " + users.get("watari"))
  const [LoggedUser, SetLoggedUser] = useState("");
  const [file, SetFile] = useState("");

  
  //   var user_mode = users.get(LoggedUser).getLight_mode() ? " light_mode" : "";

  const [Mode, SetMode] = useState("");



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login SetLoggedUser={SetLoggedUser} />}
        ></Route>
        <Route path="/Register" element={<Register SetFile={SetFile}/>}></Route>
        <Route
          path="/Main_screen"
          element={<Main_screen LoggedUser={LoggedUser} file={file} Mode={Mode} SetMode={SetMode}/>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
