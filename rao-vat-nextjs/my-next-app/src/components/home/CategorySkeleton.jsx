import React from 'react';
import { Grid, Card, CardContent, Skeleton } from '@mui/material';

const CategorySkeleton = () => {
  return (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Skeleton variant="text" width="66%" height={32} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="50%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="25%" height={18} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorySkeleton;