export const formatDate = (date: string): string => {
    const parsedDate = new Date(date);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - parsedDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        if (hoursDiff < 1) {
            const minutesDiff = Math.floor(timeDiff / (1000 * 60));
            return `${minutesDiff}min ago`;
        }
        return `${hoursDiff}h ago`;
    } else if (daysDiff < 7) {
        return `${daysDiff}d ago`;
    } else {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };

        return parsedDate.toLocaleDateString("en-US", options);
    }
};
