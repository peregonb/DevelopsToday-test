import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://simple-blog-api.crew.red/',
    headers: {
        'Content-Type': 'application/json',
    },
});
export const API = {
    getPosts() {
        return instance.get(`posts`).then((response) => response.data);
    },
    deletePost(postId: number) {
        return instance.delete(`posts/${postId}`);
    },
    getSinglePost(postId: number) {
        return instance.get(`posts/${postId}?_embed=comments`);
    },
    postComment(postId: number, body: string) {
        return instance.post(`comments`, { postId, body });
    },
    postPost(title: string, body: string) {
        return instance.post(`posts`, { title, body });
    },
    putPost(postId: number, title: string, body: string) {
        return instance.put(`posts/${postId}`, { title, body });
    },
};
