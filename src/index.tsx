import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import CommentSection from "./CommentSection";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CommentSection />
  </React.StrictMode>
);
