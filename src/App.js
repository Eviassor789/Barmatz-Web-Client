import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import users from "./Users_data/Users";

import Register from "./Register/Register";
import Main_screen from "./Main_screen/Main_screen";
import Login from "./Login/Login";

function App() {

  const [LoggedUser, SetLoggedUser] = useState("");
  const [LoggedUser_token, SetLoggedUser_token] = useState("");


  
  //   var user_mode = users.get(LoggedUser).getLight_mode() ? " light_mode" : "";

  const [Mode, SetMode] = useState("");



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login SetLoggedUser={SetLoggedUser} SetLoggedUser_token={SetLoggedUser_token} LoggedUser={LoggedUser}/>}
        ></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route
          path="/Main_screen"
          element={<Main_screen LoggedUser={LoggedUser} Mode={Mode} SetMode={SetMode} SetLoggedUser_token={SetLoggedUser_token} LoggedUser_token={LoggedUser_token}/>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
