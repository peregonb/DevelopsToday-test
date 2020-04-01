import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://simple-blog-api.crew.red/',
});
export const API = {
    getPosts() {
        return instance.get(`posts`).then((response) => response.data);
    },
    deletePost(postId: number) {
        return instance.delete(`posts/${postId}`).then((response) => response);
    },
};
