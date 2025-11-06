import React from 'react';
import { usePostList } from '../../contexts/PostListContext';
import PostCard from './PostCard';
import PostListSkeleton from './PostListSkeleton';
import Pagination from '../ui/Pagination';
import US_STATES from '../../constants/usStates';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Typography,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Postlist = () => {
  const {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    sortBy,
    selectedState,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    handleStateChange,
  } = usePostList();

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={10}>
        <Alert severity="error" variant="filled">
          Lỗi: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box width="100%">
      {/* Filter Bar */}
      <Box mb={4} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
        {/* Search Bar */}
        <TextField
          fullWidth
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Tìm kiếm bài đăng..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="medium"
        />

        {/* State Filter Dropdown */}
        <TextField
          select
          label="Tiểu bang"
          value={selectedState || 'all'}
          onChange={(e) => handleStateChange(e.target.value === 'all' ? null : e.target.value)}
          variant="outlined"
          size="medium"
          sx={{ minWidth: 160 }}
        >
          {US_STATES.map((state) => (
            <MenuItem key={state.code} value={state.code}>
              {state.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Sort Dropdown */}
        <TextField
          select
          label="Sắp xếp"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          variant="outlined"
          size="medium"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="newest">Mới nhất</MenuItem>
          <MenuItem value="oldest">Cũ nhất</MenuItem>
        </TextField>
      </Box>

      {/* Posts Grid */}
      {loading ? (
        <PostListSkeleton count={12} />
      ) : posts.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={10}>
          <Typography variant="h6" color="text.secondary">
            {searchQuery ? 'Không tìm thấy bài đăng nào' : 'Chưa có bài đăng nào'}
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Postlist;