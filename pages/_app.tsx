import { Provider } from 'react-redux';
import store from '../redux/store';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import stylesheet from 'antd/dist/antd.dark.min.css';
import LayoutContainer from '../components/LayoutContainer';
import { NextPage } from 'next';

const antdFix = `
    .ant-page-header-content{
        padding-top: 0 !important;
    }
`;

const App: NextPage<any> = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <style dangerouslySetInnerHTML={{ __html: antdFix }} />

            <LayoutContainer>
                <Component {...pageProps} />
            </LayoutContainer>
        </Provider>
    );
};

export default App;
