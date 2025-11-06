import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getPostById } from '../../services/postService';
import { revealContact, getRevealedPosts } from '../../services/revealService';
import useDeviceId from '../../hooks/useDeviceId';
import PostShowSkeleton from './PostShowSkeleton';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Alert,
  Stack,
  Divider,
  IconButton,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Mapbox
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_BOX_API_KEY;

function MapBoxAddress({ address }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!address) return;
    if (map.current) return;

    const fetchCoordinates = async () => {
      try {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
          )}.json`,
          {
            params: {
              access_token: MAPBOX_TOKEN,
            },
          }
        );
        const data = res.data;
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: 13,
            accessToken: MAPBOX_TOKEN,
          });

          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div>
              <strong>Địa chỉ:</strong><br/>
              ${address}
            </div>`
          );

          markerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map.current);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Lỗi lấy tọa độ Mapbox:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <Box mt={2} sx={{ width: "100%", height: 300, borderRadius: 2, overflow: "hidden" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
}

const PostShow = ({ initialPost = null }) => {
  const router = useRouter();
  const { id } = router.query;
  const deviceId = useDeviceId();
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [revealed, setRevealed] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [canReveal, setCanReveal] = useState(true);

  const formatAddress = () => {
    if (!post?.address_info && !post?.city && !post?.state) return null;
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

  useEffect(() => {
    if (id && !initialPost) {
      fetchPostDetail();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (deviceId && id) {
      checkRevealedStatus();
    }
    // eslint-disable-next-line
  }, [deviceId, id]);

  const checkRevealedStatus = async () => {
    try {
      const response = await getRevealedPosts(deviceId);
      if (response?.success) {
        const isRevealed = response.data.posts.includes(id);
        setRevealed(isRevealed);
        setCanReveal(response.data.canReveal);

        if (!response.data.canReveal) {
          setCooldown(response.data.timeToReset);
          if (response.data.timeToReset > 0) {
            const interval = setInterval(() => {
              setCooldown((prev) => {
                if (prev <= 1) {
                  clearInterval(interval);
                  setCanReveal(true);
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          }
        }
      }
    } catch (err) {
      console.error('Error checking revealed status:', err);
    }
  };

  const handleReveal = async () => {
    if (revealed || !canReveal) return;
    try {
      const response = await revealContact(deviceId, id);
      if (response?.success) {
        setRevealed(true);
        setCanReveal(response.data.canReveal);

        if (!response.data.canReveal) {
          setCooldown(response.data.timeToReset);
          const interval = setInterval(() => {
            setCooldown((prev) => {
              if (prev <= 1) {
                clearInterval(interval);
                setCanReveal(true);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    } catch (err) {
      console.error('Error revealing contact:', err);
    }
  };

  const fetchPostDetail = async () => {
    setLoading(true);
    try {
      const response = await getPostById(id);
      if (response?.success) {
        setPost(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid Date';
    if (timestamp._seconds || timestamp.seconds) {
      const seconds = timestamp._seconds || timestamp.seconds;
      return new Date(seconds * 1000).toLocaleDateString('vi-VN');
    }
    return new Date(timestamp).toLocaleDateString('vi-VN');
  };

  if (loading) return <PostShowSkeleton />;

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={10}>
        <Alert severity="error" variant="filled">
          Lỗi: {error}
        </Alert>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={10}>
        <Typography variant="h6" color="text.secondary">
          Không tìm thấy bài đăng
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="md" mx="auto">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
        variant="outlined"
        color="secondary"
      >
        Quay lại
      </Button>

      <Card sx={{ borderRadius: 3, boxShadow: 3, p: { xs: 2, sm: 4 } }}>
        <CardContent>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Typography variant="h4" fontWeight={700} color="text.primary" flex={1}>
              {post.title}
            </Typography>
            <Chip
              label={post.category}
              color="secondary"
              sx={{ ml: 2, fontWeight: 600, fontSize: 16 }}
            />
          </Stack>

          {/* Image Gallery */}
          {post.photos && post.photos.length > 0 && (
            <Box mb={4}>
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 240, sm: 320, md: 384 },
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={post.photos[currentImageIndex]}
                  alt={`${post.title} - ${currentImageIndex + 1}`}
                  style={{
                    width: '100%',
                    maxHeight: 384,
                    objectFit: 'contain',
                    borderRadius: 8,
                  }}
                />
              </Box>
              {post.photos.length > 1 && (
                <Stack direction="row" spacing={1} overflow="auto" pb={1}>
                  {post.photos.map((photo, index) => (
                    <Avatar
                      key={index}
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      variant="rounded"
                      sx={{
                        width: 64,
                        height: 64,
                        border: index === currentImageIndex ? 2 : 1,
                        borderColor: index === currentImageIndex ? 'secondary.main' : 'grey.300',
                        cursor: 'pointer',
                        opacity: index === currentImageIndex ? 1 : 0.7,
                        transition: 'border-color 0.2s, opacity 0.2s',
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </Stack>
              )}
            </Box>
          )}

          {/* Description */}
          <Box mb={4}>
            <Typography variant="h6" color="secondary" fontWeight={600} mb={1}>
              Mô tả
            </Typography>
            <Typography color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
              {post.description}
            </Typography>
          </Box>

          {/* Address */}
          {formatAddress() && (
            <Box mb={4}>
              <Typography variant="h6" color="secondary" fontWeight={600} mb={1}>
                Địa chỉ
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon color="action" />
                <Typography color="text.secondary">{formatAddress()}</Typography>
              </Stack>
              <MapBoxAddress address={formatAddress()} />
            </Box>
          )}

          {/* Contact Info */}
          <Box mb={4}>
            <Typography variant="h6" color="secondary" fontWeight={600} mb={1}>
              Thông tin liên hệ
            </Typography>
            {(post.contact_info?.phone || post.contact_info?.secondary_phone_number || post.contact_info?.email) ? (
              !revealed ? (
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: 'grey.200',
                      color: 'grey.500',
                      borderRadius: 2,
                      filter: 'blur(6px)',
                      fontSize: 18,
                      letterSpacing: 1,
                      userSelect: 'none',
                      minWidth: 180,
                      textAlign: 'center',
                    }}
                  >
                    {post.contact_info?.phone || '***-***-****'}
                    {post.contact_info?.secondary_phone_number ? ` - ${post.contact_info.secondary_phone_number}` : ''}
                    {post.contact_info?.email ? ` - ${post.contact_info.email}` : ''}
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleReveal}
                    disabled={!canReveal}
                  >
                    {cooldown > 0 ? `Vui lòng chờ ${cooldown}s` : 'Nhấn để xem thông tin'}
                  </Button>
                  {cooldown > 0 && (
                    <Typography color="error" variant="body2">
                      Đã vượt quá 3 lần xem liên tiếp. Vui lòng chờ {cooldown}s để tiếp tục.
                    </Typography>
                  )}
                </Stack>
              ) : (
                <Stack spacing={1}>
                  {post.contact_info?.phone && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PhoneIcon color="action" />
                      <Typography color="text.primary" fontWeight={600}>
                        <a href={`tel:${post.contact_info.phone}`} style={{ color: '#7c3aed', textDecoration: 'none' }}>
                          {post.contact_info.phone}
                        </a>
                      </Typography>
                    </Stack>
                  )}
                  {post.contact_info?.secondary_phone_number && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PhoneIcon color="action" />
                      <Typography color="text.primary" fontWeight={600}>
                        <a href={`tel:${post.contact_info.secondary_phone_number}`} style={{ color: '#7c3aed', textDecoration: 'none' }}>
                          {post.contact_info.secondary_phone_number}
                        </a>
                      </Typography>
                    </Stack>
                  )}
                  {post.contact_info?.email && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EmailIcon color="action" />
                      <Typography color="text.primary" fontWeight={600}>
                        <a href={`mailto:${post.contact_info.email}`} style={{ color: '#7c3aed', textDecoration: 'none' }}>
                          {post.contact_info.email}
                        </a>
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              )
            ) : (
              <Typography color="text.secondary">Không có thông tin liên hệ</Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Post Info */}
          <Box>
            <Typography variant="h6" color="secondary" fontWeight={600} mb={1}>
              Thông tin đăng tin
            </Typography>
            <Stack spacing={1} color="text.secondary">
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2">
                  Ngày đăng: {formatDate(post.createdAt)}
                </Typography>
              </Stack>
              <Typography variant="body2">ID: {post.id}</Typography>
              {post.postUrl && (
                <Typography variant="body2">
                  <a
                    href={post.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#7c3aed', textDecoration: 'underline' }}
                  >
                    Xem bài gốc →
                  </a>
                </Typography>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostShow;