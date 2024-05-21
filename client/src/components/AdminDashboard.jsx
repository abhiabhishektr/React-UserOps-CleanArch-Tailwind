// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const adminURL = 'http://localhost:4000/api/admin';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: '',
    isAdmin: false
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(adminURL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setIsEditing(true);
  };

  const handleBlock = async (id) => {
    try {
      await axios.put(`${adminURL}/${id}/block`);
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await axios.put(`${adminURL}/${id}/unblock`);
      fetchUsers();
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${adminURL}/${selectedUser._id}`, formData);
      setIsEditing(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                {user.status === 'blocked' ? (
                  <button onClick={() => handleUnblock(user._id)}>Unblock</button>
                ) : (
                  <button onClick={() => handleBlock(user._id)}>Block</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <form onSubmit={handleSave} className="mt-4">
          <h3>Edit User</h3>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Status:
            <input type="text" name="status" value={formData.status} onChange={handleChange} />
          </label>
          <label>
            Admin:
            <input type="checkbox" name="isAdmin" checked={formData.isAdmin} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
