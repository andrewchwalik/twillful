import React from "react";
import { renderToString } from "react-dom/server";
import TwillfulSite from "./App.jsx";

export const html = renderToString(<TwillfulSite />);
