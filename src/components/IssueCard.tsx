import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Collapse,
    IconButton,
    Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import clsx from "clsx";

import React, { useState } from "react";

import { useStyles } from "./RepositoryCard";

export const ISSUE_STATE_COLOR = {
    OPEN: "#28a745",
    CLOSED: "#d73a49",
    MERGED: "#6f42c1",
};

const IssueCard: React.FC<any> = (issue) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const date = new Date(issue.createdAt);
    const dateString = date.toDateString() + " at " + date.getHours() + ":" + date.getMinutes();

    return (
        <Card raised style={{ width: "100%" }}>
            <CardHeader
                title={
                    <Link href={issue.url} fontWeight={600} variant="h6" underline="hover">
                        {issue.title}
                    </Link>
                }
                subheader={"Created on " + dateString}
            ></CardHeader>

            <CardActions disableSpacing>
                <Chip
                    label={issue.state}
                    sx={{
                        marginLeft: "8px",
                        backgroundColor:
                            ISSUE_STATE_COLOR[issue.state as keyof typeof ISSUE_STATE_COLOR],
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
                        dangerouslySetInnerHTML={{ __html: issue.bodyHTML }}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default IssueCard;
