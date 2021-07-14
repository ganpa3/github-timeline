import {
    Avatar,
    Card,
    CardContent,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    useMediaQuery,
} from "@material-ui/core";
import { Theme, useTheme } from "@material-ui/core/styles";
import LanguageIcon from "@material-ui/icons/Language";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/styles";

import React from "react";
import { useParams } from "react-router-dom";

import useQeury from "../hooks/useQuery";
import Progress from "./Progress";
import { URLParams } from "./TimelineView";

export interface UserProfile {
    avatarUrl: string;
    bio: string;
    createdAt: string;
    email: string;
    followers: {
        totalCount: number;
    };
    following: {
        totalCount: number;
    };
    issues: {
        totalCount: number;
    };
    location: string;
    login: string;
    name: string;
    pullRequests: {
        totalCount: number;
    };
    repositories: {
        totalCount: number;
    };
    twitterUsername: string;
    url: string;
    websiteUrl: string;
}

interface ProfileProps {
    userType: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            width: "auto",
            padding: "0 16px",
        },
        [theme.breakpoints.up("md")]: {
            top: "0",
            paddingTop: "16px",
            paddingLeft: "10px",
            position: "sticky",
            alignSelf: "flex-start",
        },
    },
}));

const Profile: React.FC<ProfileProps> = ({ userType }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const { username } = useParams<URLParams>();

    const { data: user, isLoading } = useQeury(userType, userType, {
        username,
    });

    if (isLoading) {
        // Don't show Profile's loading spinner on smaller widths, because
        // two spinners (this and timeline's) look bad.
        return matches ? (
            <></>
        ) : (
            <div className={classes.root}>
                <Progress />
            </div>
        );
    }

    let userBlogURL = "";
    if (user.websiteUrl) {
        userBlogURL = user.websiteUrl;
        const remove = ["https://www.", "http://www.", "http://", "https://"];
        remove.forEach((x) => {
            userBlogURL.includes(x) && (userBlogURL = userBlogURL.replace(x, ""));
        });
    }

    const date = new Date(user.createdAt);
    const dateString = date.toDateString() + " at " + date.getHours() + ":" + date.getMinutes();

    return (
        <div className={classes.root}>
            <Card raised>
                <CardContent>
                    <List dense>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt={user.login} src={user.avatarUrl} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name}
                                secondary={
                                    <Link className="inline" href={user.url} underline="hover">
                                        {user.login}
                                    </Link>
                                }
                            />
                        </ListItem>

                        {userType === "user" && (
                            <>
                                <ListItem>
                                    <Typography>{user.bio}</Typography>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary="Followers: " />
                                    <ListItemSecondaryAction>
                                        {user.followers.totalCount}
                                    </ListItemSecondaryAction>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary="Following: " />
                                    <ListItemSecondaryAction>
                                        {user.following.totalCount}
                                    </ListItemSecondaryAction>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary="Issues: " />
                                    <ListItemSecondaryAction>
                                        {user.issues.totalCount}
                                    </ListItemSecondaryAction>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary="Pull Requests: " />
                                    <ListItemSecondaryAction>
                                        {user.pullRequests.totalCount}
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </>
                        )}

                        <ListItem>
                            <ListItemText primary="Repositories: " />
                            <ListItemSecondaryAction>
                                {user.repositories.totalCount}
                            </ListItemSecondaryAction>
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Joined" secondary={dateString} />
                        </ListItem>

                        {user.location && (
                            <ListItem>
                                <ListItemText primary="Location" secondary={user.location} />
                            </ListItem>
                        )}

                        {user.email && (
                            <ListItem>
                                <MailOutlineIcon />
                                <Link href={"mailto:" + user.email} underline="hover">
                                    <Typography>{user.email}</Typography>
                                </Link>
                            </ListItem>
                        )}

                        {user.websiteUrl && (
                            <ListItem>
                                <LanguageIcon />
                                <Link href={user.websiteUrl} underline="hover">
                                    <Typography>{userBlogURL}</Typography>
                                </Link>
                            </ListItem>
                        )}

                        {user.twitterUsername && (
                            <ListItem>
                                <TwitterIcon />
                                <Link
                                    href={"https://twitter.com/" + user.twitterUsername}
                                    underline="hover"
                                >
                                    <Typography>{user.twitterUsername}</Typography>
                                </Link>
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
