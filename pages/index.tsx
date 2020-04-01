import { Card, Modal, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { deletePostTC, getPostsTC } from '../redux/app-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { PostsType } from '../interfaces/index';
import { AppStateType } from '../redux/store';
import Link from 'next/link';

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
    isFetching: boolean;
};

type MapDispatchPropsType = {
    getPostsTC: () => void;
    deletePostTC: (postId: number) => void;
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const IndexPage: React.FC<PropsType> = (props) => {
    const { confirm } = Modal;

    const error = (): any => {
        Modal.error({
            title: 'Failed to delete post!',
            content: 'Server is not responding.',
        });
    };
    const showConfirm = (postId: number): any => {
        confirm({
            title: 'Do you want to delete these post?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                return new Promise((resolve, reject) => {
                    props.deletePostTC(postId);
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => error());
            },
        });
    };

    useEffect(() => {
        props.getPostsTC();
    }, []);

    return (
        <PostsWrapper>
            {props.posts ? (
                props.posts.map((post: PostsType) => (
                    <PostSpace key={post.id}>
                        <Card
                            title={post.title}
                            actions={[
                                <Link key={post.id} href={`/posts?slug=${post.id}`} as={`/posts/${post.id}`}>
                                    <EditOutlined key="edit" />
                                </Link>,
                                <DeleteOutlined
                                    onClick={() => showConfirm(post.id)}
                                    twoToneColor="#eb2f96"
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
        isFetching: state.app.isFetching,
    };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        getPostsTC,
        deletePostTC,
    }),
)(IndexPage);
