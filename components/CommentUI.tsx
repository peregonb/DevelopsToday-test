import React from 'react';
import { Avatar, Comment } from 'antd';
import styled from 'styled-components';

const CommentWrapper = styled(Comment)`
    background-color: rgba(20, 20, 20, 0.5) !important;
    padding: 5px 15px !important;
    margin-bottom: 15px;

    .ant-avatar {
        height: 50px;
        width: 50px;
        img {
            height: 50px;
            width: 50px;
        }
    }
`;

type PropTypes = {
    text: string;
};

export const CommentUI: React.FC<PropTypes> = ({ text }) => {
    return (
        <CommentWrapper
            avatar={<Avatar src="https://www.davisderby.com/uploads/images/image/sil.jpg" alt="Anonymous" />}
            author={'Anonymous'}
            content={<p>{text}</p>}
        />
    );
};
