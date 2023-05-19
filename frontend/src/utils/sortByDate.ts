export const sortByDate = (array: Post[]) => {
    return array.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
            return -1;
        } else {
            return 1;
        }
    });
};