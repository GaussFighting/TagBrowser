import React from "react";
import "react-toastify/dist/ReactToastify.css";
import useFetchTags from "./hooks/useFetchTags";
import { ToastContainer } from "react-toastify";
import Table from "./components/Table";
import Error from "./components/Error";

function App() {
  const { loading, tagsObj, error } = useFetchTags();

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Table loading={loading} items={tagsObj.items} />
      </div>
      {error && <Error error={error} />}
    </>
  );
}

export default App;
