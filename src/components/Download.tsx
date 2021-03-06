import { Fab, Tooltip } from "@mui/material";
import { Theme } from "@mui/material/styles";
import GetAppRoundedIcon from "@mui/icons-material/GetAppRounded";
import { makeStyles } from "@mui/styles";

import React, { useCallback } from "react";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: "fixed",
        bottom: theme.spacing(2),
        left: theme.spacing(2),
    },
}));

interface DownloadProps {
    data: Array<Record<string, any>>;
}

const Download: React.FC<DownloadProps> = ({ data }) => {
    const classes = useStyles();

    const download = useCallback(() => {
        const downloadData = JSON.stringify(data, null, 2);
        const file = new Blob([downloadData], { type: "application/json" });
        const fileDownloadURL = URL.createObjectURL(file);

        const a = document.createElement("a");
        a.href = fileDownloadURL;
        a.download = "data.json";
        a.click();

        URL.revokeObjectURL(fileDownloadURL);
    }, [data]);

    return (
        <Tooltip title="Download loaded data">
            <div onClick={download} role="presentation" className={classes.root}>
                <Fab color="primary" size="small" aria-label="download loaded data">
                    <GetAppRoundedIcon />
                </Fab>
            </div>
        </Tooltip>
    );
};

export default Download;
