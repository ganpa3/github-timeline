import React, { useCallback } from "react";

interface TimeProps {
    datetime: string;
}

const Time: React.FC<TimeProps> = ({ datetime }) => {
    const getDateAndTime = useCallback(() => {
        const dateAndTime = new Date(datetime);
        return (
            dateAndTime.toDateString() +
            " at " +
            dateAndTime.toLocaleString("en-IN", { timeStyle: "short" })
        );
    }, [datetime]);

    return <time dateTime={datetime}>{getDateAndTime()}</time>;
};

export default Time;
