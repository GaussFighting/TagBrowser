import React from "react";
import "react-toastify/dist/ReactToastify.css";
import useFetchTags from "./hooks/useFetchTags";
import { ToastContainer } from "react-toastify";
import Table from "./components/Table";
import Error from "./components/Error";

function App() {
  const { loading, tagsObj, error, totalObj } = useFetchTags();

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Table loading={loading} items={tagsObj.items} total={totalObj.total}/>
      </div>
      {error && <Error error={error} />}
    </>
  );
}

export default App;
