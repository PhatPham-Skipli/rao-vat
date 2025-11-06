import React from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const PostCard = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${post.id}`);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid Date';
    if (timestamp._seconds || timestamp.seconds) {
      const seconds = timestamp._seconds || timestamp.seconds;
      return new Date(seconds * 1000).toLocaleDateString('vi-VN');
    }
    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  const getSourceBadge = (source) => {
    if (source === 'nguoivietraovat') {
      return <Chip label="Rao Vặt" color="primary" size="small" sx={{ bgcolor: 'blue.100', color: 'blue.800', fontWeight: 600 }} />;
    } else if (source === 'congdongmy') {
      return <Chip label="Cộng Đồng Mỹ" color="success" size="small" sx={{ bgcolor: 'green.100', color: 'green.800', fontWeight: 600 }} />;
    }
    return null;
  };

  const formatAddress = () => {
    if (!post.address_info && !post.city && !post.state) return null;
    if (typeof post.address_info === 'object' && post.address_info !== null) {
      const { city, state } = post.address_info;
      if (city && state) return `${city}, ${state}`;
      if (city) return city;
      if (state) return state;
      return null;
    }
    if (typeof post.address_info === 'string') {
      return post.address_info;
    }
    if (post.city && post.state) return `${post.city}, ${post.state}`;
    if (post.city) return post.city;
    if (post.state) return post.state;
    return null;
  };

  const displayAddress = formatAddress();

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 6 },
        overflow: 'hidden',
      }}
      onClick={handleClick}
    >
      <CardActionArea sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}>
        {/* Image */}
        <Box sx={{ position: 'relative', width: '100%', height: 192, bgcolor: 'grey.200' }}>
          {post.main_photo ? (
            <CardMedia
              component="img"
              image={post.main_photo}
              alt={post.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          ) : (
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'grey.400' }}>
              <svg width={64} height={64} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </Box>
          )}
          {/* Source Badge */}
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            {getSourceBadge(post.source)}
          </Box>
        </Box>

        {/* Content */}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
          {/* Title */}
          <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600, color: 'text.primary', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {post.title}
          </Typography>

          {/* Address */}
          {displayAddress && (
            <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mb: 1 }}>
              <LocationOnIcon fontSize="small" sx={{ mt: '2px', color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayAddress}
              </Typography>
            </Stack>
          )}

          {/* Description */}
          {post.description && (
            <Typography variant="body2" color="text.secondary" sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {post.description}
            </Typography>
          )}

          {/* Footer */}
          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Divider sx={{ mb: 1 }} />
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="caption" color="text.secondary">
                  {formatDate(post.createdAt)}
                </Typography>
              </Stack>
              {post.category && (
                <Chip label={post.category} size="small" sx={{ bgcolor: 'purple.100', color: 'purple.800', fontWeight: 600 }} />
              )}
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;