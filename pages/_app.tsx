import { Provider } from 'react-redux';
import store from '../redux/store';
import IndexPage from './index';
import { Layout } from 'antd';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import stylesheet from 'antd/dist/antd.dark.min.css';
import Header from '../components/Header';

const antdFix = `
    .ant-page-header-content{
        padding-top: 0 !important;
    }
`;

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <style dangerouslySetInnerHTML={{ __html: antdFix }} />

            <Layout>
                <Header />
                <div className="wrapper-content" style={{ padding: '15px 25px' }}>
                    <IndexPage />
                </div>
            </Layout>
        </Provider>
    );
};

export default App;
