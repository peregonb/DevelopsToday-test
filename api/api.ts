import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://simple-blog-api.crew.red/',
});
export const API = {
    getUsers() {
        return instance.get(`posts`).then((response) => response.data);
    },
};
