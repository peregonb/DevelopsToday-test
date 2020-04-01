import * as React from 'react';
import Head from 'next/head';
import Header from './Header';
import { Layout } from 'antd';
import styled from 'styled-components';

type Props = {
    title?: string;
};

const Wrapper = styled.div`
    max-width: 1160px;
    margin: 0 auto;
    padding: 15px 25px;
    width: 100%;
`;

const LayoutContainer: React.FunctionComponent<Props> = ({ children, title = 'Blog' }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Layout>
            <Header />
            <Wrapper className="wrapper-content" style={{ padding: '15px 25px' }}>
                {children}
            </Wrapper>
        </Layout>
    </div>
);

export default LayoutContainer;
