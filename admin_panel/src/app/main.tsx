import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundaryComponent from "../utils/error_boundary.tsx";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "./providers/sidebarContext.tsx";

const navigate = useNavigate();

const Root: React.FC = () => {
  return (
    <ErrorBoundaryComponent
      fallBack="something error"
      onError={() => navigate("/")}
    >
      <SidebarContext>
        <App />
      </SidebarContext>
    </ErrorBoundaryComponent>
  );
};
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
