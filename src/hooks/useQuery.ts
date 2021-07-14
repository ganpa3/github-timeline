import { useEffect, useRef, useState } from "react";
import QUERY from "../graphql_queries";

interface Variables {
    username: string;
    pageNumber?: number;
    sortBy?: string;
    sortOrder?: string;
    states?: string[];
}

const useQuery = (searchFor: string, userType: string, variables: Variables) => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [githubFailed, setGithubFailed] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    const { username, sortBy, sortOrder, pageNumber, states } = variables;

    // TODO: We need instant access to these variables. Since react state changes are
    // asynchronous, that's not quite possible. So, use references for now
    // till a better way is found.
    const hasMore = useRef(true);
    // endcursor has to be null on the first request since an empty
    // string isn't allowed in the `after` argument of the GraphQL query
    const endcursor = useRef<string | null>(null);

    // Stringify the states array and reset the data is changed.
    const statesString = JSON.stringify(states);

    useEffect(() => {
        setData(null);
        hasMore.current = true;
        endcursor.current = null;
    }, [username, searchFor, sortBy, sortOrder, statesString]);

    useEffect(() => {
        setIsLoading(true);

        const abortController = new AbortController();

        if (hasMore.current) {
            fetch("https://api.github.com/graphql", {
                method: "POST",
                headers: {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`,
                    "Content-Type": "application/json",
                },
                signal: abortController.signal,
                body: JSON.stringify({
                    query: QUERY[searchFor as keyof typeof QUERY],
                    variables: { ...variables, endcursor: endcursor.current },
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.errors) {
                        // Github's API is janky. Can't handle heavy load.
                        if (
                            result.errors[0].message.startsWith(
                                "Something went wrong while executing your query"
                            )
                        ) {
                            setGithubFailed(true);
                        } else {
                            setUserNotFound(true);
                        }
                    } else {
                        if (pageNumber === undefined) {
                            setData(result.data[userType]);
                        } else {
                            const userData =
                                result.data[userType][
                                    searchFor === "org_repositories" ? "repositories" : searchFor
                                ];
                            setData((prevState: any) => {
                                return prevState
                                    ? prevState.concat(userData.edges)
                                    : userData.edges;
                            });

                            hasMore.current = userData.pageInfo.hasNextPage;
                            endcursor.current = userData.pageInfo.endCursor;
                        }
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    if (error.name === "AbortError") {
                        return;
                    }
                    setIsLoading(false);
                    setError(true);
                });
        } else {
            setIsLoading(false);
        }

        return () => abortController.abort();
        // eslint-disable-next-line
    }, [searchFor, username, sortOrder, pageNumber, userType]);

    return {
        endcursor,
        data,
        error,
        githubFailed,
        isLoading,
        hasMore: hasMore.current,
        userNotFound,
    };
};

export default useQuery;
