// import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// const ProtectedRoute = ({ role }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/login" replace />;
//   if (role && user.role !== role) return <Navigate to="/unauthorized" replace />;

//   return <Outlet />;
// };

// export default ProtectedRoute;