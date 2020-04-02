export type CommentsType = {
    id: number;
    postId: number;
    body: string;
};

export type PostsType = {
    id: number;
    title: string;
    body: string;
    comments: Array<CommentsType>;
};
