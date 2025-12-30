import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Shield, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminKyc = () => {
  const [kycDocuments, setKycDocuments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    try {
      const params = filter ? `?status=${filter}` : '';
      const [kycRes, statsRes] = await Promise.all([
        axios.get(`${API}/admin/kyc${params}`),
        axios.get(`${API}/admin/kyc/statistics`)
      ]);
      setKycDocuments(kycRes.data.data || []);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to fetch KYC data');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.post(`${API}/admin/kyc/${id}/approve`);
      setKycDocuments(kycDocuments.map(doc => doc.id === id ? {...doc, status: 'approved'} : doc));
      toast.success('KYC approved');
      setSelectedDoc(null);
    } catch (error) {
      toast.error('Failed to approve KYC');
    }
  };

  const handleReject = async (id, reason = 'Document not acceptable') => {
    try {
      await axios.post(`${API}/admin/kyc/${id}/reject`, { rejection_reason: reason });
      setKycDocuments(kycDocuments.map(doc => doc.id === id ? {...doc, status: 'rejected'} : doc));
      toast.success('KYC rejected');
      setSelectedDoc(null);
    } catch (error) {
      toast.error('Failed to reject KYC');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      case 'rejected': return 'bg-red-500/20 text-red-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getDocumentTypeLabel = (type) => {
    const labels = {
      'passport': 'Passport',
      'national_id': 'National ID',
      'drivers_license': "Driver's License",
      'proof_of_address': 'Proof of Address'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="display-large mb-2">KYC Reviews</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">Review and verify user identity documents</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Total Submissions</div>
            <div className="text-2xl font-bold text-white">{stats?.total || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Pending Review</div>
            <div className="text-2xl font-bold text-yellow-500">{stats?.pending || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Approved</div>
            <div className="text-2xl font-bold text-green-500">{stats?.approved || 0}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Rejected</div>
            <div className="text-2xl font-bold text-red-500">{stats?.rejected || 0}</div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-white px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* KYC Table */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">User</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Document Type</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Status</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Submitted</th>
                  <th className="text-left px-6 py-4 text-[var(--text-muted)] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {kycDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-overlay)]">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{doc.user?.name || 'Unknown'}</div>
                        <div className="text-[var(--text-muted)] text-sm">{doc.user?.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {getDocumentTypeLabel(doc.document_type)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedDoc(doc)}
                          className="p-2 bg-[var(--bg-overlay)] hover:bg-[var(--brand-primary)] hover:text-black transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                        {doc.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(doc.id)}
                              className="p-2 bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white transition-colors"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleReject(doc.id)}
                              className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {kycDocuments.length === 0 && (
            <div className="text-center py-12 text-[var(--text-muted)]">
              No KYC submissions found
            </div>
          )}
        </div>

        {/* View Document Modal */}
        {selectedDoc && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] w-full max-w-lg">
              <h2 className="text-xl font-bold text-white mb-4">KYC Document Review</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-[var(--text-muted)] text-sm">User</div>
                  <div className="text-white">{selectedDoc.user?.name} ({selectedDoc.user?.email})</div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm">Document Type</div>
                  <div className="text-white">{getDocumentTypeLabel(selectedDoc.document_type)}</div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm">Status</div>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedDoc.status)}`}>
                    {selectedDoc.status}
                  </span>
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm">Document Path</div>
                  <div className="text-white text-sm break-all">{selectedDoc.document_path}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="flex-1 px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]"
                >
                  Close
                </button>
                {selectedDoc.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedDoc.id)}
                      className="flex-1 bg-green-500 text-white px-4 py-2 font-semibold hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedDoc.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 font-semibold hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminKyc;
