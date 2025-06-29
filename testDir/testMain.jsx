import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Game from "./App.jsx";
import { TooltipPlacement } from "./tooltip.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TooltipPlacement />
  </StrictMode>
);
