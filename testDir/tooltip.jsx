import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Tooltip, Button } from "@material-tailwind/react";
export function TooltipPlacement() {
  return (
    <div>
      <h1>Hellow</h1>
      <div>
        <Tooltip content="hello" placement="top">
          <Button>Top</Button>
        </Tooltip>
      </div>
    </div>
  );
}
