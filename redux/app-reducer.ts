import { API } from '../api/api';
import { PostsType } from '../interfaces';

const SET_POSTS = 'SET_POSTS';
const GET_SINGLE_POST = 'GET_SINGLE_POST';
const ERROR = 'ERROR';

const initialState = {
    posts: [] as Array<PostsType>,
    singlePost: null as PostsType | null,
    error: false,
};

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts,
            };
        case GET_SINGLE_POST:
            return {
                ...state,
                singlePost: action.singlePost,
            };
        case ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

type SetError = {
    type: typeof ERROR;
    error: boolean;
};
export const setError = (error: boolean): SetError => {
    return {
        type: ERROR,
        error,
    };
};

type SetSinglePost = {
    type: typeof GET_SINGLE_POST;
    singlePost: object;
};
export const setSinglePost = (singlePost: object): SetSinglePost => {
    return {
        type: GET_SINGLE_POST,
        singlePost,
    };
};

type SetPostsType = {
    type: typeof SET_POSTS;
    posts: object;
};
export const setPosts = (posts: object): SetPostsType => {
    return {
        type: SET_POSTS,
        posts,
    };
};

export const createPostTC = (title: string, body: string) => async (dispatch: any) => {
    const response = await API.postPost(title, body);
    if (response.status === 201) {
        const data = await API.getPosts();
        dispatch(setPosts(data));
    }
};

export const updatePostTC = (userId: number, title: string, body: string) => async (dispatch: any) => {
    const response = await API.putPost(userId, title, body);
    if (response.status === 201) {
        const data = await API.getPosts();
        dispatch(setPosts(data));
    }
};

export const putCommentTC = (postId: number, body: string) => async (dispatch: any) => {
    const response = await API.postComment(postId, body);
    dispatch(setPosts(response));
    if (response.status === 201) {
        const response = await API.getSinglePost(postId);
        if (response.status === 200) {
            dispatch(setSinglePost(response.data));
        }
    }
};

export const getSinglePostTC = (postId: number) => async (dispatch: any) => {
    const response = await API.getSinglePost(postId);
    if (response.status === 200) {
        dispatch(setSinglePost(response.data));
    }
};

export const getPostsTC = () => async (dispatch: any) => {
    const data = await API.getPosts();
    dispatch(setPosts(data));
};

export const deletePostTC = (postId: number) => async (dispatch: any) => {
    const response = await API.deletePost(postId);
    if (response.status === 200) {
        dispatch(setError(false));
        const data = await API.getPosts();
        dispatch(setPosts(data));
    } else {
        dispatch(setError(true));
    }
};

export default appReducer;
