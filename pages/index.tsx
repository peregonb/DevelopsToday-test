import { Card, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { deletePostTC, getPostsTC } from '../redux/app-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { PostsType } from '../interfaces/index';
import { AppStateType } from '../redux/store';
import Link from 'next/link';
import { showConfirm } from '../components/ConfirmUI';

const PostSpace = styled.div`
    padding-right: 10px;
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    &:nth-child(3n) {
        padding-right: 0;
    }

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
    }

    @media (max-width: 992px) {
        width: 50%;
        padding-right: 10px;
        &:nth-child(even) {
            padding-right: 0 !important;
        }
        &:nth-child(3n) {
            padding-right: 10px;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        padding-right: 0;
        &:nth-child(3n) {
            padding-right: 0;
        }
    }
`;

const PostsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap !important;
    justify-content: flex-start;
    align-items: stretch;
`;

type MapStatePropsType = {
    posts: Array<PostsType>;
    error: boolean;
};
type MapDispatchPropsType = {
    getPostsTC: () => void;
    deletePostTC: (postId: number) => void;
};
type OwnPropsType = {};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const IndexPage: React.FC<PropsType> = ({ deletePostTC, getPostsTC, posts, error }) => {
    useEffect(() => {
        getPostsTC();
    }, []);

    return (
        <PostsWrapper>
            {posts.length ? (
                posts.map((post: PostsType) => (
                    <PostSpace key={post.id}>
                        <Card
                            title={post.title}
                            actions={[
                                <Link key={post.id} href={`/posts?slug=${post.id}`} as={`/posts/${post.id}`}>
                                    <EditOutlined key="edit" />
                                </Link>,
                                <DeleteOutlined
                                    onClick={() => showConfirm(post.id, deletePostTC, error)}
                                    key="delete"
                                />,
                            ]}
                        >
                            {post.body}
                        </Card>
                    </PostSpace>
                ))
            ) : (
                <Typography>There are no available posts. You should try to make your own!</Typography>
            )}
        </PostsWrapper>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.app.posts,
        error: state.app.error,
    };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        getPostsTC,
        deletePostTC,
    }),
)(IndexPage);
