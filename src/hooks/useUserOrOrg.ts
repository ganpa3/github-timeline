// A simple hook to find Github user type,
// "user" or "organization".
// This is important since Github's GraphQL queries
// are different for each.
import { useEffect, useState } from "react";

const useUserOrOrg = (username: string) => {
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState("");
    const [error, setError] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    useEffect(() => {
        setUserType("");
        setLoading(true);

        if (username) {
            fetch("https://api.github.com/users/" + username, {
                headers: {
                    Authorization: `token ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    try {
                        setUserType(data.type.toLowerCase());
                        setUserNotFound(false);
                    } catch {
                        setUserNotFound(true);
                    }
                })
                .catch((err) => {
                    setError(true);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [username]);

    return { loading, error, userNotFound, userType };
};

export default useUserOrOrg;
