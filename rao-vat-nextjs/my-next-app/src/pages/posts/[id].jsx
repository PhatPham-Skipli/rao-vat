import Head from 'next/head';
import { Container } from '@mui/material';
import PostShow from '../../components/post/PostShow';

export default function PostDetailPage({ post }) {
  const title = post ? `${post.title} - Rao Vặt` : 'Chi tiết bài đăng';
  const description = post?.description 
    ? post.description.substring(0, 160) 
    : 'Xem chi tiết bài đăng rao vặt từ cộng đồng người Việt tại Mỹ';
  const imageUrl = post?.main_photo || post?.photos?.[0] || '';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PostShow initialPost={post} />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
    const response = await fetch(`${baseUrl}/posts/${id}`);
    const data = await response.json();

    if (!data?.success || !data?.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: data.data,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      props: {
        post: null,
      },
    };
  }
}