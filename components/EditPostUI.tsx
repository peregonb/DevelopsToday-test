import { Button, Form, Input, Modal, Typography } from 'antd';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/store';
import { createPostTC, updatePostTC } from '../redux/app-reducer';
import { useEffect, useRef } from 'react';
import { FormInstance } from 'antd/lib/form/util';
import Router from 'next/router';

const { Title } = Typography;

const Item = styled(Form.Item)`
    width: 100%;
    display: flex;
    // margin-bottom: 0 !important;
    & > div {
        max-width: 100%;
        // margin-bottom: 0 !important;
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
    header: string;
    type: string;
};

type PostTypes = {
    body: string;
    title: string;
    id: number;
};

type MapStatePropsType = {
    singlePost: PostTypes;
};

type MapDispatchPropsType = {
    createPostTC: (title: string, body: string) => void;
    updatePostTC: (id: number, title: string, body: string) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsTypes;

type RefTypes = HTMLInputElement & FormInstance;
const EditPostUI: React.FC<PropsType> = ({ header, type, createPostTC, singlePost, updatePostTC }) => {
    const form = useRef<RefTypes>(null);

    useEffect(() => {
        if (type === 'edit') {
            if (form && form.current) {
                form.current.setFieldsValue({
                    title: singlePost.title,
                    body: singlePost.body,
                });
            }
        }
    }, []);

    const success = (text: string): any => {
        Modal.success({
            content: text,
            onOk() {
                Router.push('/');
            },
        });
    };

    const error = (title: string, content: string): any => {
        Modal.error({
            title,
            content,
        });
    };

    const onFinish = (values: any) => {
        if (type === 'new') {
            createPostTC(values.title, values.body);
            success('The post has been created!');
        } else if (type === 'edit') {
            updatePostTC(singlePost.id, values.title, values.body);
            success('The post has been updated!');
        }
        if (form && form.current) {
            form.current.resetFields();
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        if (type === 'new') {
            error('Failed to add post.', errorInfo);
        } else if (type === 'edit') {
            error('Failed to update current post.', errorInfo);
        }
    };

    return (
        <>
            <Title level={3}>{header} </Title>
            <Form
                ref={form}
                style={{ marginTop: 20 }}
                name="basic"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Item name="title" rules={[{ required: true, message: 'This field can`t be empty!' }]}>
                    <Input placeholder="Your new post title." />
                </Item>

                <Item name="body" rules={[{ required: true, message: 'This field can`t be empty!' }]}>
                    <Textarea placeholder="Your new post content." />
                </Item>
                <Item style={{ marginTop: 11 }}>
                    <Button type="primary" htmlType="submit">
                        {header}
                    </Button>
                </Item>
            </Form>
        </>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        singlePost: state.app.singlePost,
    };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsTypes, AppStateType>(mapStateToProps, {
        createPostTC,
        updatePostTC,
    }),
)(EditPostUI);
