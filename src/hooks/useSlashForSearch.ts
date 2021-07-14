import { MutableRefObject, useEffect } from "react";

const useSlashForSearch = (inputRef: MutableRefObject<HTMLInputElement | null>) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "/") {
                event.preventDefault();
                inputRef.current?.focus();
                return;
            }

            if (event.key === "Escape" && document.activeElement === inputRef.current) {
                inputRef.current?.blur();
                return;
            }
        };
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [inputRef]);
};

export default useSlashForSearch;
