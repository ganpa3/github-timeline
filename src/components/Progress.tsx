import { CircularProgress, Grid } from "@mui/material";
import React from "react";

const Progress: React.FC<{}> = () => {
    return (
        <Grid container justifyContent="center">
            <CircularProgress />
        </Grid>
    );
};

export default Progress;
