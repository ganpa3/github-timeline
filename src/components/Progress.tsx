import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";

const Progress: React.FC<{}> = () => {
    return (
        <Grid container justifyContent="center">
            <CircularProgress />
        </Grid>
    );
};

export default Progress;
