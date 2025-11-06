import React from 'react';
import { Grid, Card, CardContent, Skeleton, Box } from '@mui/material';

const PostListSkeleton = ({ count = 12 }) => {
  return (
    <Grid container spacing={3} mb={4}>
      {Array.from({ length: count }).map((_, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
          <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ width: '100%', height: 192, bgcolor: 'grey.200' }}>
              <Skeleton variant="rectangular" width="100%" height={192} />
            </Box>
            <CardContent>
              <Skeleton variant="text" width="75%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="50%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="66%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="25%" height={18} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostListSkeleton;