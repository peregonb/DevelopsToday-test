import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Post: NextPage<any> = () => {
    const router = useRouter();
    const postId = router.query.postid;

    return <p>My Blog Post id: {postId}</p>;
};

export default Post;
