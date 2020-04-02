import { API } from '../api/api';
import { PostsType } from '../interfaces';

const SET_POSTS = 'SET_POSTS';
const IS_FETCHING = 'IS_FETCHING';
const GET_SINGLE_POST = 'GET_SINGLE_POST';

const initialState = {
    posts: [] as Array<PostsType>,
    singlePost: null as PostsType | null,
    isFetching: false,
};

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts,
            };

        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case GET_SINGLE_POST:
            return {
                ...state,
                singlePost: action.singlePost,
            };
        default:
            return state;
    }
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

type SetFetchingValueType = {
    type: typeof IS_FETCHING;
    isFetching: boolean;
};

export const setFetchingValue = (isFetching: boolean): SetFetchingValueType => {
    return {
        type: IS_FETCHING,
        isFetching,
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
        const data = await API.getPosts();
        dispatch(setPosts(data));
    }
};

export default appReducer;
