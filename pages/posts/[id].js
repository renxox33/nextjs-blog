import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths(){
    const posts = getAllPostIds();
    return {
        paths: posts,
        fallback: false
    };
};

export async function getStaticProps(params){
    console.log("params",params);
    const content = await getPostData(params.params.id);
    return {
        props: {
            postData: content
        }
    };
};

const Post = ({ postData }) => {
    return(
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    );
};

export default Post;