import { useMutation } from "@tanstack/react-query";
import { api } from "../../../app/api";

const createComment = async (comment: Partial<IComment>): Promise<IComment> => {
    const response = await api.post("/comments/", comment);
    return response.data;
};

export const useCreateCommentMutation = () => {
    return useMutation({
        mutationFn: (comment: Partial<IComment>) => createComment(comment)
    });
};

