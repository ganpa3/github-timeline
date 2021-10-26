import {
    AppBar,
    Button,
    Checkbox,
    Drawer,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { StyledEngineProvider, Theme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import SettingsIcon from "@mui/icons-material/Settings";
import { makeStyles } from "@mui/styles";
import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    FormEventHandler,
    useEffect,
    useRef,
    useState,
} from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useSlashForSearch from "../hooks/useSlashForSearch";

const useStyles = makeStyles((theme: Theme) => ({
    brandName: {
        color: "#fff",
        textDecoration: "none",
    },
    textInput: {
        [theme.breakpoints.up("sm")]: {
            flex: "1 1 auto",
            maxWidth: "350px",
        },
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            padding: "0 16px",
            marginBottom: "6px",
        },
    },
    grow: {
        flex: "1 1 auto",
    },
    drawer: {
        width: "260px",
        padding: "24px",
    },
    drawerHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "20px",
    },
    formContainer: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "10px",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },
    inputContainer: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    usernameInput: {
        [theme.breakpoints.down("sm")]: {
            width: "auto",
        },
    },
    input: {
        paddingLeft: "6px",
        paddingRight: "6px",
    },
}));

const Home: React.FC<{}> = () => {
    const history = useHistory();
    const location = useLocation();

    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [searchFor, setSearchFor] = useState("repositories");
    const [sortBy, setSortBy] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("desc");

    const [issueStates, setIssueStates] = useState({
        open: true,
        closed: true,
        merged: true,
    });

    const [isInvalidUser, setIsInvalidUser] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // This is required in case the page is refreshed, we fill the input
    // element with the searched value.
    const username_from_url = location.pathname.split("/")[1];
    useEffect(() => {
        setUsername(username_from_url);
    }, [username_from_url]);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.code === "KeyS" && document.activeElement?.id !== "username") {
                event.preventDefault();
                setDrawerOpen((prevState: Boolean) => !prevState);
            }
        };
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    const inputRef = useRef<HTMLInputElement | null>(null);
    useSlashForSearch(inputRef);

    const handleSubmit: FormEventHandler = (event: FormEvent) => {
        event.preventDefault();

        const states = Object.entries(issueStates)
            .filter((state: [string, boolean]) => state[1] && state[0])
            .map((state) => state[0])
            .join(",");

        if (!isInvalidUser) {
            history.push(
                `/${username.trim()}/${searchFor}?sort=${sortBy},${sortOrder}${
                    searchFor === "pullRequests" || searchFor === "issues"
                        ? "&states=" + states
                        : ""
                }`
            );
        }
    };

    const handleCheckBoxChange: ChangeEventHandler<HTMLInputElement> = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        setIssueStates({ ...issueStates, [event.target.name]: event.target.checked });
    };

    return (
        <StyledEngineProvider injectFirst>
            <AppBar position="absolute">
                <Toolbar>
                    <Link className={classes.brandName} to="/">
                        <Typography variant="h6" noWrap>
                            Github Timeline
                        </Typography>
                    </Link>
                    <div className={classes.grow} />
                    <div>
                        <Tooltip title="Toggle custom search drawer (s)" enterDelay={300}>
                            <IconButton
                                color="inherit"
                                size="large"
                                onClick={() => setDrawerOpen(true)}
                            >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="GitHub repository" enterDelay={300}>
                            <IconButton
                                component="a"
                                color="inherit"
                                href="https://github.com/ganpa3/github-timeline"
                                data-ga-event-category="header"
                                data-ga-event-action="github"
                                size="large"
                            >
                                <GitHubIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <Drawer
                        classes={{ paper: classes.drawer }}
                        anchor="right"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                    >
                        <div className={classes.drawerHeader}>
                            <Typography variant="h6">Custom Search</Typography>
                            <IconButton
                                color="inherit"
                                onClick={() => setDrawerOpen(false)}
                                edge="end"
                            >
                                <CloseIcon />
                            </IconButton>
                        </div>
                        <FormControl sx={{ marginTop: "10px", marginBottom: "22px" }}>
                            <InputLabel htmlFor="search-for">Search For</InputLabel>
                            <Select
                                id="search-for"
                                label="Search For" // Required for layout
                                name="searchFor"
                                onChange={(event) => setSearchFor(event.target.value)}
                                value={searchFor}
                            >
                                <MenuItem value="repositories">Repositories</MenuItem>
                                <MenuItem value="pullRequests">Pull Requests</MenuItem>
                                <MenuItem value="issues">Issues</MenuItem>
                                <MenuItem value="issueComments">Comments</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginBottom: "22px" }}>
                            <InputLabel htmlFor="sort-by">Sort By</InputLabel>
                            <Select
                                defaultValue="Created at"
                                id="sort-by"
                                label="Sort By" // Required for layout
                                name="sortBy"
                                onChange={(event) => setSortBy(event.target.value)}
                                value={sortBy}
                            >
                                {searchFor !== "comments" && (
                                    <MenuItem value="created_at">Created at</MenuItem>
                                )}
                                <MenuItem value="updated_at">Updated at</MenuItem>
                                {searchFor === "repositories" && (
                                    <MenuItem value="stargazers">Star count</MenuItem>
                                )}
                                {searchFor === "repositories" && (
                                    <MenuItem value="name">Name</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ marginBottom: "20px" }}>
                            <InputLabel htmlFor="sort-order">Sort Order</InputLabel>
                            <Select
                                id="sort-order"
                                label="Sort Order" // Required for layout
                                name="sortOrder"
                                onChange={(event) => setSortOrder(event.target.value)}
                                value={sortOrder}
                            >
                                <MenuItem value="desc">Descending</MenuItem>
                                <MenuItem value="asc">Ascending</MenuItem>
                            </Select>
                        </FormControl>
                        {(searchFor === "pullRequests" || searchFor === "issues") && (
                            <FormControl>
                                <FormLabel>Issue/PR State</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={issueStates.open}
                                                onChange={handleCheckBoxChange}
                                                name="open"
                                            />
                                        }
                                        label="Open"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={issueStates.closed}
                                                onChange={handleCheckBoxChange}
                                                name="closed"
                                            />
                                        }
                                        label="Closed"
                                    />
                                    {searchFor === "pullRequests" && (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={issueStates.merged}
                                                    onChange={handleCheckBoxChange}
                                                    name="merged"
                                                />
                                            }
                                            label="Merged"
                                        />
                                    )}
                                </FormGroup>
                            </FormControl>
                        )}
                    </Drawer>
                </Toolbar>
            </AppBar>
            <Grid container justifyContent="center">
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: "80px",
                        marginTop: "100px",
                        marginBottom: "40px",
                    }}
                    variant="h2"
                    align="center"
                >
                    Github Timeline
                </Typography>
            </Grid>
            <form className={classes.formContainer} onSubmit={handleSubmit} id="back-to-top-anchor">
                <FormControl className={classes.textInput}>
                    <Input
                        className={classes.usernameInput}
                        classes={{
                            input: classes.input,
                        }}
                        placeholder="Enter Github username"
                        id="username"
                        inputRef={inputRef}
                        name="username"
                        onChange={(event) => {
                            const username_ = event.target.value.trim();
                            const userNameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
                            setUsername(username_);

                            if (userNameRegex.test(username_)) {
                                setIsInvalidUser(false);
                            } else if (username_) {
                                setIsInvalidUser(true);
                            }
                        }}
                        required
                        value={username}
                        type="search"
                    />
                    {isInvalidUser && <FormHelperText error>Invalid username.</FormHelperText>}
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        marginLeft: "6px",
                        paddingBottom: "4px",
                    }}
                >
                    Search
                </Button>
            </form>
        </StyledEngineProvider>
    );
};

export default Home;
