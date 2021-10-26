import { createTheme, ThemeProvider } from "@mui/material/styles";

import { CssBaseline } from "@mui/material";
import { pink } from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: pink["A400"],
        },
    },
});

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
    <ThemeProvider theme={darkTheme}>
        <React.StrictMode>
            <BrowserRouter>
                <CssBaseline />
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>,
    document.getElementById("root")
);
