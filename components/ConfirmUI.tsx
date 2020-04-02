import { Modal } from 'antd';
import Router from 'next/router';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const error = (): any => {
    Modal.error({
        title: 'Failed to delete post!',
        content: 'Server is not responding.',
    });
};
export const showConfirm = (postId: number, thunk: any): any => {
    confirm({
        title: 'Do you want to delete these post?',
        icon: <ExclamationCircleOutlined />,
        onOk() {
            return new Promise((resolve, reject) => {
                thunk(postId);
                Router.push('/');
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => {
                error();
            });
        },
    });
};
