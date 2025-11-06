import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Typography, Box, Alert } from '@mui/material';
import { PostListProvider, usePostList } from '../../contexts/PostListContext';
import Postlist from '../../components/post/PostList';

const PostListPageContent = () => {
  const router = useRouter();
  const { category, state } = router.query;
  const { setSelectedCategory, selectedCategory, setSelectedState } = usePostList();

  useEffect(() => {
    if (category) setSelectedCategory(category);
    if (typeof state !== 'undefined') setSelectedState(state || null);
  }, [category, state, setSelectedCategory, setSelectedState]);

  const pageTitle = selectedCategory ? `${selectedCategory} - Rao Vặt` : 'Danh sách bài đăng';
  const pageDescription = selectedCategory 
    ? `Xem các bài đăng trong danh mục ${selectedCategory} từ cộng đồng người Việt tại Mỹ`
    : 'Khám phá các bài đăng rao vặt từ cộng đồng người Việt tại Mỹ';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
          {selectedCategory ? `Danh mục: ${selectedCategory}` : 'Danh sách bài đăng'}
        </Typography>
        
        {selectedCategory ? (
          <Postlist />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" py={10}>
            <Typography variant="h6" color="text.secondary">
              Vui lòng chọn danh mục từ trang chủ.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default function PostListPage() {
  return (
    <PostListProvider>
      <PostListPageContent />
    </PostListProvider>
  );
}