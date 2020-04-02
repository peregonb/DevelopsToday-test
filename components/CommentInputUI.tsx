import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/store';
import { putCommentTC } from '../redux/app-reducer';
import { useRef } from 'react';
import { FormInstance } from 'antd/lib/form/util';

const Item = styled(Form.Item)`
    width: 100%;
    display: flex;
    margin-bottom: 0 !important;
    & > div {
        max-width: 100%;
        margin-bottom: 0 !important;
    }
`;
const Textarea = styled(Input.TextArea)`
    &:focus {
        &::placeholder {
            color: transparent;
        }
    }
`;

type OwnPropsTypes = {
    postId: number;
};
type MapStatePropsType = {};
type MapDispatchPropsType = {
    putCommentTC: (postId: number, body: string) => void;
};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsTypes;
type RefTypes = HTMLInputElement & FormInstance;

const CommentInputUI: React.FC<PropsType> = ({ postId, putCommentTC }) => {
    const form = useRef<RefTypes>(null);

    const onFinish = (values: any) => {
        putCommentTC(postId, values.postText);
        if (form && form.current) {
            form.current.resetFields();
        }
    };

    return (
        <Form ref={form} style={{ marginTop: 20 }} name="basic" initialValues={{ remember: false }} onFinish={onFinish}>
            <Item name="postText" rules={[{ required: true, message: 'This field can`t be empty!' }]}>
                <Textarea placeholder="What`s new going on?" />
            </Item>
            <Item style={{ marginTop: 11 }}>
                <Button type="primary" htmlType="submit">
                    Send comment
                </Button>
            </Item>
        </Form>
    );
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsTypes, AppStateType>(null, {
        putCommentTC,
    }),
)(CommentInputUI);
