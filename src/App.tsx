import { Alert, Grid, IconButton, Snackbar } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";

import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Form from "./components/Form";
import Profile from "./components/Profile";
import Progress from "./components/Progress";
import ScrollTop from "./components/ScrollTop";
import TimelineView from "./components/TimelineView";
import useUserOrOrg from "./hooks/useUserOrOrg";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: "1280px",
        margin: "0 auto",
    },
    flex: {
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
        },
    },
}));

const App: React.FC<{}> = () => {
    const classes = useStyles();
    const location = useLocation();
    const username = location.pathname.split("/")[1];

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { loading, error, userNotFound, userType } = useUserOrOrg(username);

    const snackbarAction = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenSnackbar(false)}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <div className={classes.root}>
            <Form />
            {loading ? (
                <Progress />
            ) : userNotFound ? (
                <Grid container justifyContent="center">
                    <Alert severity="error">User not found!</Alert>
                </Grid>
            ) : error ? (
                <Grid container justifyContent="center">
                    <Alert severity="error">Network Error!</Alert>
                </Grid>
            ) : (
                userType && (
                    <Switch>
                        <Route
                            path={[
                                "/:username/:searchFor/:sortOrder",
                                "/:username/:searchFor",
                                "/:username",
                            ]}
                        >
                            <div className={classes.flex}>
                                <Profile userType={userType} />
                                <TimelineView
                                    userType={userType}
                                    setOpenSnackbar={setOpenSnackbar}
                                />
                            </div>
                            <Snackbar
                                open={openSnackbar}
                                autoHideDuration={6000}
                                onClose={() => setOpenSnackbar(false)}
                                message="Organizations cannot make issues, pull requests or comments."
                                action={snackbarAction}
                            />
                        </Route>
                    </Switch>
                )
            )}
            <ScrollTop />
        </div>
    );
};

export default App;
