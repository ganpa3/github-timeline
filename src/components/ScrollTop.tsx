import { Fab, useScrollTrigger, Zoom } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import React, { useCallback } from "react";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const ScrollTop: React.FC<{}> = () => {
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
    });

    const scrollToTop = useCallback(() => {
        const anchor = document.querySelector("#back-to-top-anchor");

        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, []);

    return (
        <Zoom in={trigger}>
            <div onClick={scrollToTop} role="presentation" className={classes.root}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <ExpandLessIcon />
                </Fab>
            </div>
        </Zoom>
    );
};

export default ScrollTop;
