import React from "react";
import ReactDOM from "react-dom/client";
import Router from "@/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/index.css";
import "sweetalert2/dist/sweetalert2.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
