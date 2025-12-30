import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import axios from 'axios';
import { toast } from 'sonner';
import { Search, Edit, Trash2, Ban } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (roleFilter) params.append('role', roleFilter);
      params.append('page', currentPage);

      const response = await axios.get(`${API}/admin/users?${params}`);
      setUsers(response.data.data);
      setPagination({
        current: response.data.current_page,
        last: response.data.last_page,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async (userId) => {
    if (!window.confirm('Are you sure you want to suspend this user?')) return;

    try {
      await axios.post(`${API}/admin/users/${userId}/suspend`);
      toast.success('User suspended successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to suspend user');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      await axios.delete(`${API}/admin/users/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="display-large mb-2">User Management</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">
          Manage all platform users
        </p>

        {/* Filters */}
        <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)]" size={20} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full bg-black border border-[var(--border-subtle)] pl-10 pr-4 py-2 text-white focus:border-[var(--brand-primary)] focus:outline-none"
                />
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-2">Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full bg-black border border-[var(--border-subtle)] px-4 py-2 text-white focus:border-[var(--brand-primary)] focus:outline-none"
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Total */}
            <div className="flex items-end">
              <div className="text-white">
                <span className="text-2xl font-bold">{pagination?.total || 0}</span>
                <span className="text-[var(--text-muted)] ml-2">total users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-secondary)]">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-secondary)]">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-secondary)]">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-secondary)]">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--text-secondary)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--bg-overlay)]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-black flex items-center justify-center font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-semibold text-white">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${
                        user.role === 'admin' 
                          ? 'bg-red-500/20 text-red-500' 
                          : 'bg-blue-500/20 text-blue-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {user.role !== 'admin' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSuspend(user.id)}
                            className="p-2 hover:bg-yellow-500/20 text-yellow-500 rounded transition-colors"
                            title="Suspend User"
                          >
                            <Ban size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 hover:bg-red-500/20 text-red-500 rounded transition-colors"
                            title="Delete User"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.last > 1 && (
            <div className="px-6 py-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div className="text-[var(--text-muted)]">
                Page {pagination.current} of {pagination.last}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-black border border-[var(--border-subtle)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-overlay)]"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.last}
                  className="px-4 py-2 bg-black border border-[var(--border-subtle)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-overlay)]"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersManagement;
