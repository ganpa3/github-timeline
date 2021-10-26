import {
    Card,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    Link,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import clsx from "clsx";

import React, { useState } from "react";

import { useStyles } from "./RepositoryCard";

const CommentCard: React.FC<any> = (comment) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const date = new Date(comment.createdAt);
    const dateString = date.toDateString() + " at " + date.getHours() + ":" + date.getMinutes();

    return (
        <Card raised style={{ width: "100%" }}>
            <CardHeader
                action={
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
                }
                title={
                    <>
                        <Link
                            href={comment.url}
                            variant="h6"
                            sx={{ fontSize: 18 }}
                            underline="hover"
                        >
                            Comment
                        </Link>

                        <Typography component="span"> created in </Typography>
                        <Link
                            href={comment.repository.url}
                            rel="noopener"
                            target="_blank"
                            fontWeight={600}
                            variant="h6"
                            underline="hover"
                        >
                            {comment.repository.nameWithOwner}
                        </Link>
                        <Typography component="span"> on {dateString}</Typography>
                    </>
                }
            ></CardHeader>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div
                        className={classes.markdownBody}
                        dangerouslySetInnerHTML={{ __html: comment.bodyHTML }}
                    />
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default CommentCard;
