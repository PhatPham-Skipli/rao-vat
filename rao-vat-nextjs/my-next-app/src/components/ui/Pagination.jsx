import React from 'react';
import { Box, IconButton, Button, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
      <Stack direction="row" spacing={1} alignItems="center">
        {/* Previous Button */}
        <IconButton
          onClick={handlePrevious}
          disabled={currentPage === 1}
          color="primary"
          sx={{
            bgcolor: currentPage === 1 ? 'grey.200' : 'white',
            border: '1px solid',
            borderColor: currentPage === 1 ? 'grey.200' : 'purple.700',
            color: currentPage === 1 ? 'grey.400' : 'purple.700',
            '&:hover': { bgcolor: 'purple.50' },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <Button
              key={index}
              disabled
              variant="outlined"
              sx={{
                minWidth: 40,
                bgcolor: 'white',
                color: 'grey.400',
                borderColor: 'grey.200',
                cursor: 'default',
              }}
            >
              ...
            </Button>
          ) : (
            <Button
              key={index}
              onClick={() => handlePageClick(page)}
              variant={page === currentPage ? 'contained' : 'outlined'}
              color={page === currentPage ? 'secondary' : 'primary'}
              sx={{
                minWidth: 40,
                bgcolor: page === currentPage ? 'purple.700' : 'white',
                color: page === currentPage ? 'white' : 'purple.700',
                borderColor: 'purple.700',
                fontWeight: page === currentPage ? 700 : 500,
                '&:hover': {
                  bgcolor: page === currentPage ? 'purple.800' : 'purple.50',
                },
              }}
            >
              {page}
            </Button>
          )
        )}

        {/* Next Button */}
        <IconButton
          onClick={handleNext}
          disabled={currentPage === totalPages}
          color="primary"
          sx={{
            bgcolor: currentPage === totalPages ? 'grey.200' : 'white',
            border: '1px solid',
            borderColor: currentPage === totalPages ? 'grey.200' : 'purple.700',
            color: currentPage === totalPages ? 'grey.400' : 'purple.700',
            '&:hover': { bgcolor: 'purple.50' },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Pagination;