import { useState } from 'react';
import { motion } from 'framer-motion';

const UserManagement = () => {
  const [loading] = useState(false);

  // TODO: Add user API service when backend is ready
  const mockUsers = [
    {
      id: 1,
      firstName: 'Admin',
      lastName: 'InnerWave',
      email: 'admin@innerwave.com',
      role: 'Admin',
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
          <p className="text-gray-600 mt-1">{mockUsers.length} total users</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-blue-700">
          <strong>Note:</strong> User management API endpoints are under development. 
          This page will be fully functional once the backend API is ready.
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5cd9aa] to-[#4aaee0] flex items-center justify-center text-white font-bold">
                        {user.firstName.charAt(0)}
                      </div>
                      <p className="font-medium text-gray-800">{user.firstName} {user.lastName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition opacity-50 cursor-not-allowed"
                        title="Coming soon"
                        disabled
                      >
                        ✏️
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition opacity-50 cursor-not-allowed"
                        title="Coming soon"
                        disabled
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;