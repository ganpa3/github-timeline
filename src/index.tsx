import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { CssBaseline } from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

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
