import { customAxios } from "./api/customAxios";

export const likePost = (data: { userId: string, postId: string}, accessToken: string) => {
    return customAxios.post("/posts/like/", data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};

export const dislikePost = (data: { userId: string, postId: string}, accessToken: string) => {
    return customAxios.post("/posts/dislike/", data, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};

// export const getPostLikesNumber = (postId: string, accessToken: string) => {
//     return customAxios.get(`/posts/likes/${postId}`, {
//         headers: {
//             "Authorization": `Bearer ${accessToken}`
//         }
//     }).then((response) => response.data);
// };

export const checkUserLike = (userId: string, postId: string, accessToken: string) => {
    return customAxios.get(`/posts/user/likes/?userId=${userId}&postId=${postId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }).then((response) => response.data);
};
