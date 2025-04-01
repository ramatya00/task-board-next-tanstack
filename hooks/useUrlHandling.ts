import { useState } from "react";

export function useUrlHandling(boardUrl: string) {
    const [tooltip, setTooltip] = useState(false);

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(boardUrl);
        setTooltip(true);
        setTimeout(() => setTooltip(false), 2000);
    };

    return { tooltip, handleCopyUrl };
}