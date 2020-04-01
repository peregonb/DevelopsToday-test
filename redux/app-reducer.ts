import {API} from '../api/api';
import {PostsType} from '../interfaces';

const SET_POSTS = 'SET_POSTS';
const IS_FETCHING = 'IS_FETCHING';
const REMOVE_POST = 'REMOVE_POST';

const initialState = {
    posts: [] as Array<PostsType>,
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
        case REMOVE_POST:
            return {
                ...state,
                posts: action.posts,
            };
        default:
            return state;
    }
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

type RemovePostType = {
    type: typeof SET_POSTS;
    posts: object;
};

export const removePost = (posts: object): RemovePostType => {
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

export const getPostsTC = () => async (dispatch: any) => {
    setFetchingValue(true);
    const data = await API.getPosts();
    dispatch(setPosts(data));
    setFetchingValue(false);
};

export const deletePostTC = (postId: number) => async (dispatch: any) => {
    setFetchingValue(true);
    const response = await API.deletePost(postId);
    if (response.status === 200) {
        const data = await API.getPosts();
        dispatch(setPosts(data));
    }
    setFetchingValue(false);
};

export default appReducer;
