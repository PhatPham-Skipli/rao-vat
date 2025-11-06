import React from 'react';
import { Box, Card, CardContent, Skeleton, Stack } from '@mui/material';

const PostShowSkeleton = () => (
  <Box maxWidth="md" mx="auto">
    {/* Back button skeleton */}
    <Skeleton variant="rectangular" width={128} height={40} sx={{ mb: 3, borderRadius: 2 }} />

    <Card sx={{ borderRadius: 3, boxShadow: 3, p: { xs: 2, sm: 4 } }}>
      <CardContent>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Skeleton variant="text" width="66%" height={40} />
          <Skeleton variant="rounded" width={96} height={36} sx={{ ml: 2 }} />
        </Stack>

        {/* Image Gallery */}
        <Box mb={4}>
          <Skeleton variant="rectangular" width="100%" height={320} sx={{ borderRadius: 2, mb: 2 }} />
          <Stack direction="row" spacing={1}>
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} variant="rounded" width={64} height={64} />
            ))}
          </Stack>
        </Box>

        {/* Description */}
        <Box mb={4}>
          <Skeleton variant="text" width="25%" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="100%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="66%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={24} />
        </Box>

        {/* Address */}
        <Box mb={4}>
          <Skeleton variant="text" width="25%" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={24} />
        </Box>

        {/* Contact Info */}
        <Box mb={4}>
          <Skeleton variant="text" width="25%" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="33%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="33%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="33%" height={24} />
        </Box>

        {/* Post Info */}
        <Box>
          <Skeleton variant="text" width="25%" height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="50%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="33%" height={24} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="25%" height={24} />
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default PostShowSkeleton;