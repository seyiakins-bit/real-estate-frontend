// src/components/UserManagement.jsx
import React, { useState } from "react";

const UserManagement = ({ users = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Filtered users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter ? user.role === roleFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleRoleChange = (role) => {
    if (selectedUser) setSelectedUser({ ...selectedUser, role });
    // Here you would also call your backend API to update role
  };

  const handleStatusChange = (status) => {
    if (selectedUser) setSelectedUser({ ...selectedUser, status });
    // Call API to update status
  };

  const handleResetPassword = () => {
    if (!selectedUser) return;
    alert(`Password reset email sent to ${selectedUser.email}`);
    // Call backend API for password reset
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Roles</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="agent">Agent</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* User List */}
      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-2">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="border p-3 rounded flex justify-between items-center bg-white shadow-sm cursor-pointer"
              onClick={() => handleSelectUser(user)}
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">
                  Role: {user.role} | Status: {user.status} | Joined: {user.joinedDate || "N/A"}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">
                  Edit
                </button>
                <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                  Ban / Unblock
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected User Details */}
      {selectedUser && (
        <div className="mt-6 border p-4 rounded bg-gray-50 shadow">
          <h3 className="text-xl font-bold mb-2">User Details</h3>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
          <p><strong>Status:</strong> {selectedUser.status}</p>
          <p><strong>Joined:</strong> {selectedUser.joinedDate || "N/A"}</p>
          <p><strong>Last Login:</strong> {selectedUser.lastLogin || "N/A"}</p>

          {/* Role & Status Management */}
          <div className="flex gap-2 mt-2">
            <select
              value={selectedUser.role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>

            <select
              value={selectedUser.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>

            <button
              onClick={handleResetPassword}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
