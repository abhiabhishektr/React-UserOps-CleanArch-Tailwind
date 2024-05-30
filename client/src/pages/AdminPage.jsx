import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import { useSelector } from 'react-redux';

// const AdminPage = () => {
//   const navigate = useNavigate();
//   const isAdminLoginedIn = useSelector((state) => state.user.isAdminLoginedIn);

//   useEffect(() => {
//     if (!isAdminLoginedIn) {
//       navigate('/AdminLoginPage');
//     } 
//   }, [isAdminLoginedIn, navigate]);

//   return (
//     <div>
//       {isAdminLoginedIn && <AdminDashboard />}
//     </div>
//   );
// };

// export default AdminPage;


function AdminPage() {
  return <div><AdminDashboard/></div>;
}

export default AdminPage;

//protective route / hoc