import { API } from '../api/api';
import { PostsType } from '../interfaces';

const SET_POSTS = 'SET_POSTS';
const IS_FETCHING = 'IS_FETCHING';

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
    const data = await API.getUsers();
    dispatch(setPosts(data));
    setFetchingValue(false);
};

export default appReducer;
