import React from "react";
import { hydrateRoot } from "react-dom/client";
import TwillfulSite from "./App.jsx";

hydrateRoot(document.getElementById("root"), <TwillfulSite />);
