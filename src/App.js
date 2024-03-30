import React, { useEffect } from "react";
import useFetchTags from "./hooks/useFetchTags";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const { loading, tags } = useFetchTags();
  console.log(loading, tags);
  const toastId = React.useRef(null);

  useEffect(() => {
    if (loading) {
      console.log("toast");
      toastId.current = toast("Results in progress", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.dismiss(toastId.current);
    }
  }, [loading]);

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div>abc</div>
    </>
  );
}

export default App;
