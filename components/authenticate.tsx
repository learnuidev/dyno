// const

"use client";

import { Login } from "./login";
// import { Register } from "./register";
import { useState } from "react";

export const Authenticate = () => {
  const [currentView, setCurentView] = useState("register");

  return <Login />;
};
