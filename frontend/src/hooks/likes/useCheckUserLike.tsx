import { useQuery } from "@tanstack/react-query";
import { checkUserLike } from "../../services/likes";

interface isLikedType { 
    isLiked: boolean;
}

export const useCheckUserLike = (authorId: string, postId: string, onSucessFunc: (data: isLikedType) => void) => {
    const QUERY_KEYS = ["likes", authorId, postId]; 
        
    return useQuery({
        queryKey: QUERY_KEYS,
        queryFn: () => checkUserLike(authorId, postId),
        onSuccess: (data: isLikedType) => onSucessFunc(data)
    });
};