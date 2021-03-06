import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Collapse,
    IconButton,
    Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import clsx from "clsx";

import React, { useState } from "react";

import { ISSUE_STATE_COLOR } from "./IssueCard";
import { useStyles } from "./RepositoryCard";

const IssueCard: React.FC<any> = (pullRequest) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const date = new Date(pullRequest.createdAt);
    const dateString = date.toDateString() + " at " + date.getHours() + ":" + date.getMinutes();

    return (
        <Card raised style={{ width: "100%" }}>
            <CardHeader
                title={
                    <Link href={pullRequest.url} underline="hover" fontWeight={600} variant="h6">
                        {pullRequest.title}
                    </Link>
                }
                subheader={"Created on " + dateString}
            ></CardHeader>

            <CardActions disableSpacing>
                <Chip
                    label={pullRequest.state}
                    sx={{
                        marginLeft: "8px",
                        backgroundColor:
                            ISSUE_STATE_COLOR[pullRequest.state as keyof typeof ISSUE_STATE_COLOR],
                        color: "#fff",
                    }}
                />
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div
                        className={classes.markdownBody}
                        dangerouslySetInnerHTML={{ __html: pullRequest.bodyHTML }}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default IssueCard;
