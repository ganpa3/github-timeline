import { Card, CardActions, CardContent, CardHeader, Link, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

import { LawIcon, LinkIcon, RepoForkedIcon, StarIcon } from "@primer/octicons-react";

import React from "react";

import Time from "./Time";

export const useStyles = makeStyles((theme: Theme) => ({
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto!important",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    cardContentPaddingTop: {
        paddingTop: "0!important",
    },
    repositoryName: {
        fontWeight: 700,
    },
    markdownBody: {
        overflow: "auto",
        lineHeight: "1.5",
    },
    m6: {
        marginRight: "16px",
    },
    repoLanguageColor: {
        display: "inline-block",
        position: "relative",
        top: "1px",
        width: "12px",
        height: "12px",
        border: "1px solid #1b1f231a",
        borderRadius: "50%",
        boxSizing: "border-box",
    },
    x: {
        padding: "16px!important",
        fontSize: "14px",
    },
    overflow: {
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
}));

const RepositoryCard: React.FC<any> = (repository) => {
    const classes = useStyles();

    return (
        <Card raised style={{ width: "100%" }}>
            <CardHeader
                title={
                    <Link href={repository.url} fontWeight={600} variant="h6" underline="hover">
                        {repository.name}
                    </Link>
                }
                subheader={
                    <Typography variant="body2">
                        {repository.isFork ? "Forked" : "Created"} on{" "}
                        <Time datetime={repository.createdAt}></Time>
                    </Typography>
                }
            ></CardHeader>
            <CardContent classes={{ root: classes.cardContentPaddingTop }}>
                <Typography>{repository.description}</Typography>
            </CardContent>

            <CardActions classes={{ root: classes.x }}>
                <div className={classes.overflow}>
                    {repository.primaryLanguage && (
                        <span className={classes.m6}>
                            <span
                                className={classes.repoLanguageColor}
                                style={{
                                    backgroundColor: repository.primaryLanguage.color,
                                }}
                            />
                            <span> {repository.primaryLanguage.name}</span>
                        </span>
                    )}
                    <span className={classes.m6}>
                        <StarIcon size={18} verticalAlign="middle" aria-label="star" />{" "}
                        {repository.stargazerCount}
                    </span>
                    <span className={classes.m6}>
                        <RepoForkedIcon size={18} verticalAlign="middle" aria-label="fork" />{" "}
                        {repository.forkCount}
                    </span>
                    {repository.licenseInfo && (
                        <span className={classes.m6}>
                            <LawIcon size={18} verticalAlign="middle" />{" "}
                            {repository.licenseInfo.name}
                        </span>
                    )}
                    {repository.homepageUrl && (
                        <span>
                            <LinkIcon size={18} verticalAlign="middle" />{" "}
                            <Link href={repository.homepageUrl} rel="noopener" target="_blank">
                                {repository.homepageUrl}
                            </Link>
                        </span>
                    )}
                </div>
            </CardActions>
        </Card>
    );
};

export default RepositoryCard;
