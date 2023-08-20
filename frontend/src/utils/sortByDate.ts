function sortByDate<Type extends { updatedAt: string }>(array: Type[]): Type[] {
    return array.sort((a: Type, b: Type) => {
        if (a.updatedAt > b.updatedAt) {
            return -1;
        } else {
            return 1;
        }
    });
}

export const sortCommentsByDate = sortByDate<IComment>;
export const sortPostsByDate = sortByDate<IPost>;
