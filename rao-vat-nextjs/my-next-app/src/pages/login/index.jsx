import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { login } from '../../services/auth/authService';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const data = await login(identifier, password);
    if (data.success) {
      toast.success('Đăng nhập thành công!');
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        window.location.href = '/';
      }, 1200);
    } else {
      toast.error(data.message || 'Đăng nhập thất bại!');
    }
  } catch (err) {
    toast.error('Có lỗi xảy ra!');
  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" color="primary" fontWeight="bold" align="center" gutterBottom>
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            label="Username hoặc Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <TextField
            label="Mật khẩu"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}