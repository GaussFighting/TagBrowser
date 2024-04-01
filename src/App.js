import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Table from "./components/Table";

function App() {
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="container">
        <Table />
      </div>
    </>
  );
}

export default App;
