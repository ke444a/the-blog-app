export const sortByDate = (array: IPost[]) => {
    return array.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) {
            return -1;
        } else {
            return 1;
        }
    });
};