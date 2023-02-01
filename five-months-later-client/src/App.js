import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Todos from "./pages/todos";
import Add from "./pages/add";
import Singlecontent from "./pages/singlecontent";
import Error from "./pages/error";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Todos />
            </>
          }
        />
        <Route path="/add" element={<Add />} />
        <Route
          path="/singlecontent/:id"
          element={
            <>
              <Navbar />
              <Singlecontent />
            </>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
