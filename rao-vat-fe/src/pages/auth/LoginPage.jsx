import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth/authService';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(identifier, password);
      console.log('Login response:', res);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      console.log('Login error:', err);
      setError(
        err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Đăng nhập
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Username hoặc Email</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Nhập username hoặc email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-700">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-center">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-purple-700 text-white py-2 rounded font-semibold hover:bg-purple-800 transition"
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;