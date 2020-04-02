import { Card, Empty, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { CommentUI } from '../../components/CommentUI';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { deletePostTC, getSinglePostTC } from '../../redux/app-reducer';
import { useEffect } from 'react';
import { CommentsType, PostsType } from '../../interfaces';
import CommentInputUI from '../../components/CommentInputUI';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { showConfirm } from '../../components/ConfirmUI';

const CardWrapper = styled(Card)`
    .ant-card-head-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .ant-card-head-title {
        padding-right: 20px;
        font-size: 24px;
        overflow: visible;
        white-space: normal;
        @media (max-width: 768px) {
            font-size: 18px;
        }
    }
    .ant-card-extra {
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 768px) {
            height: 60px;
        }
    }
`;
const Edit = styled(EditOutlined)`
    font-size: 16px;
    margin-right: 10px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: #3c9ae8;
        transition: color 0.3s;
    }
`;
const Remove = styled(DeleteOutlined)`
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
        color: #e84749;
        transition: color 0.3s;
    }
`;
const Comments = styled.div`
    margin-top: 20px;
`;

type OwnPropsTypes = {
    postId: number;
};
type MapStatePropsType = {
    singlePost: PostsType;
    error: boolean;
};
type MapDispatchPropsType = {
    getSinglePostTC: (postId: number) => void;
    deletePostTC: (postId: number) => void;
};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsTypes;

const Post: React.FC<PropsType> = ({ getSinglePostTC, singlePost, deletePostTC, error }) => {
    const id = useRouter().query.postid;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const postId = parseInt(id);

    useEffect(() => {
        if (postId) {
            getSinglePostTC(postId);
        }
    }, [id]);

    return (
        <>
            {singlePost ? (
                <>
                    <CardWrapper
                        key={singlePost.id}
                        title={singlePost.title}
                        bordered={false}
                        extra={[
                            <Link key={1} href={`/posts/edit`}>
                                <Tooltip title="Edit post">
                                    <Edit key="edit" />
                                </Tooltip>
                            </Link>,
                            <Tooltip key={2} title="Delete post">
                                <Remove key="delete" onClick={() => showConfirm(singlePost.id, deletePostTC, error)} />
                            </Tooltip>,
                        ]}
                    >
                        {singlePost.body}
                    </CardWrapper>
                    <CommentInputUI postId={singlePost.id} />
                    <Comments>
                        {singlePost.comments.length ? (
                            singlePost.comments
                                .reverse()
                                .map((comment: CommentsType) => <CommentUI key={comment.id} text={comment.body} />)
                        ) : (
                            <Empty description={<span>There are no comments, yet.</span>} />
                        )}
                    </Comments>
                </>
            ) : (
                <Empty />
            )}
        </>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        singlePost: state.app.singlePost,
        error: state.app.error,
    };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsTypes, AppStateType>(mapStateToProps, {
        getSinglePostTC,
        deletePostTC,
    }),
)(Post);
