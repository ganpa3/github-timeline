import { Alert, Grid, List, ListItem } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import useQuery from "../hooks/useQuery";
import CommentCard from "./CommentCard";
import Download from "./Download";
import IssueCard from "./IssueCard";
import Progress from "./Progress";
import PullRequestCard from "./PullRequestCard";
import RepositoryCard from "./RepositoryCard";

export interface URLParams {
    username: string;
    searchFor: string;
    sortOrder: string;
}

interface TimelineViewProps {
    setOpenSnackbar: (value: boolean) => void;
    userType: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "70%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        marginBottom: "25px",
    },
    loadingSpinner: {
        display: "flex",
        justifyContent: "center",
    },
}));

const TimelineView: React.FC<TimelineViewProps> = ({ setOpenSnackbar, userType }) => {
    const classes = useStyles();
    const location = useLocation();

    const { username, searchFor = "repositories" } = useParams<URLParams>();

    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        if (userType === "organization" && searchFor !== "repositories") {
            setOpenSnackbar(true);
        }
    }, [userType, searchFor, setOpenSnackbar]);

    const query = new URLSearchParams(location.search);
    const [sortBy, sortOrder] = query
        .get("sort")!
        .split(",")
        .map((state) => state.toUpperCase());

    const states = query
        .get("states")
        ?.split(",")
        .map((state) => state.toUpperCase());

    useEffect(() => {
        setPageNumber(0);
    }, [username, searchFor, sortBy, sortOrder]);

    const { data, error, githubFailed, isLoading, hasMore } = useQuery(
        userType === "organization" ? "org_repositories" : searchFor,
        userType,
        {
            username,
            sortBy,
            sortOrder,
            pageNumber,
            states,
        }
    );

    // TODO: Even though the value of hasMore changes, this callback
    // doesn't get re-evaluated. Figure out why.
    // Due to this, we use a hacky solution in useQuery
    const loadingRef = useCallback(
        (node: HTMLDivElement) => {
            const observer = new IntersectionObserver(
                (entries: Array<IntersectionObserverEntry>) => {
                    const target = entries[0];
                    if (target.isIntersecting && hasMore) {
                        setPageNumber((prev) => prev + 1);
                    }
                }
            );
            if (node) observer.observe(node);
        },
        [hasMore]
    );

    if (githubFailed) {
        return <p>githubFailed</p>;
    }

    const getCard = (cardData: any) => {
        if (userType === "organization") {
            return <RepositoryCard {...cardData} />;
        }

        switch (searchFor) {
            case "repositories":
                return <RepositoryCard {...cardData} />;
            case "pullRequests":
                return <PullRequestCard {...cardData} />;
            case "issues":
                return <IssueCard {...cardData} />;
            case "issueComments":
                if (cardData.repository) {
                    return <CommentCard {...cardData} />;
                }
        }
    };

    return (
        <div className={classes.root}>
            <List>
                {data &&
                    data.map((obj: Record<string, any>) => {
                        return <ListItem key={obj.node.url}>{getCard(obj.node)}</ListItem>;
                    })}
            </List>
            <Download data={data} />
            {isLoading && <Progress />}
            <div ref={loadingRef} id="dummy"></div>
            {error && (
                <Grid container justifyContent="center">
                    <Alert severity="error">Network Error!</Alert>
                </Grid>
            )}
        </div>
    );
};

export default TimelineView;
