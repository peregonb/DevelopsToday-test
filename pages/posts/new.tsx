import { NextPage } from 'next';
import { useRouter } from 'next/router';

const New: NextPage<any> = () => {
    const router = useRouter();
    const { slug } = router.query;

    return <p>My Blog Post: {slug}</p>;
};

export default New;
