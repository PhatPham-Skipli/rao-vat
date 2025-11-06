import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../contexts/user/UserContext';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    primary: { main: '#7c3aed', light: '#a78bfa', dark: '#5b21b6' },
    secondary: { main: '#ec4899', light: '#f472b6', dark: '#be185d' },
  },
  typography: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Box component="main" flex={1}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Box>
        <ToastContainer position="top-right" autoClose={3000} />
      </UserProvider>
    </ThemeProvider>
  );
}