import { Card, Spin, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getPostsTC } from '../redux/app-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { PostsType } from '../interfaces/index';
import { AppStateType } from '../redux/store';

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

    @media (max-width: 1200px) {
        width: 50%;
        padding-right: 10px;
        &:nth-child(even) {
            padding-right: 0;
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
};

type OwnPropsType = {};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

const IndexPage = (props: PropsType) => {
    useEffect(() => {
        props.getPostsTC();
    }, []);

    if (props.isFetching) {
        return <Spin size="large" />;
    } else {
        return (
            <PostsWrapper>
                {props.posts ? (
                    props.posts.map((post: PostsType) => (
                        <PostSpace key={post.id}>
                            <Card
                                title={post.title}
                                actions={[
                                    <EditOutlined key="edit" />,
                                    <DeleteOutlined twoToneColor="#eb2f96" key="delete" />,
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
    }
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
    }),
)(IndexPage);
