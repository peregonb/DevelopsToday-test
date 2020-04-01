import { Button, PageHeader } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';

const ButtonLink = styled(Button)`
    color: white !important;
    &:hover,
    &:active,
    &:focus {
        color: rgba(255, 255, 255, 0.5) !important;
    }
`;

const FlexHeader = styled(PageHeader)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1160px;
    margin: 0 auto;
    width: 100%;
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    background-color: #141414;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <FlexHeader className="site-page-header" title="Blog">
                <ButtonsWrapper>
                    <Link href="/">
                        <ButtonLink key="2" type="link">
                            Posts
                        </ButtonLink>
                    </Link>
                    <Link href={'/posts/new'}>
                        <Button key="1" type="primary">
                            Add Post
                        </Button>
                    </Link>
                </ButtonsWrapper>
            </FlexHeader>
        </HeaderWrapper>
    );
};

export default Header;
