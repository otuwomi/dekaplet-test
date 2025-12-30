import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Shield, Upload, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DOCUMENT_TYPES = [
  { id: 'passport', name: 'Passport', description: 'Valid international passport' },
  { id: 'national_id', name: 'National ID', description: 'Government-issued ID card' },
  { id: 'drivers_license', name: "Driver's License", description: 'Valid driving license' },
  { id: 'proof_of_address', name: 'Proof of Address', description: 'Utility bill or bank statement (max 3 months old)' }
];

const Compliance = () => {
  const [kycData, setKycData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchKycData();
  }, []);

  const fetchKycData = async () => {
    try {
      const response = await axios.get(`${API}/user/kyc`);
      setKycData(response.data.kyc_documents || []);
    } catch (error) {
      console.error('Failed to fetch KYC data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedType) {
      toast.error('Please select a document type');
      return;
    }

    setUploading(true);
    try {
      // Simulating document upload - in production, use actual file upload
      const response = await axios.post(`${API}/user/kyc`, {
        document_type: selectedType,
        document_path: `/uploads/kyc/${Date.now()}_${selectedType}.pdf`
      });
      setKycData([...kycData, response.data.kyc]);
      toast.success('Document submitted for review');
      setShowUploadModal(false);
      setSelectedType('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved':
        return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/20', label: 'Approved' };
      case 'pending':
        return { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-500/20', label: 'Pending Review' };
      case 'rejected':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/20', label: 'Rejected' };
      default:
        return { icon: AlertTriangle, color: 'text-gray-500', bg: 'bg-gray-500/20', label: 'Unknown' };
    }
  };

  const submittedTypes = kycData.map(doc => doc.document_type);
  const overallStatus = kycData.length === 0 ? 'not_started' :
    kycData.every(d => d.status === 'approved') ? 'verified' :
    kycData.some(d => d.status === 'rejected') ? 'action_required' : 'in_progress';

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="display-large mb-2">Compliance</h1>
        <p className="body-large text-[var(--text-secondary)] mb-8">Complete KYC verification to unlock all features</p>

        {/* KYC Status Banner */}
        <div className={`p-6 border mb-8 ${
          overallStatus === 'verified' ? 'bg-green-500/10 border-green-500/30' :
          overallStatus === 'action_required' ? 'bg-red-500/10 border-red-500/30' :
          overallStatus === 'in_progress' ? 'bg-yellow-500/10 border-yellow-500/30' :
          'bg-[var(--bg-secondary)] border-[var(--border-subtle)]'
        }`}>
          <div className="flex items-center gap-4">
            <Shield className={`${
              overallStatus === 'verified' ? 'text-green-500' :
              overallStatus === 'action_required' ? 'text-red-500' :
              overallStatus === 'in_progress' ? 'text-yellow-500' :
              'text-[var(--text-muted)]'
            }`} size={48} />
            <div>
              <h2 className="text-xl font-bold text-white mb-1">
                {overallStatus === 'verified' ? 'KYC Verified' :
                 overallStatus === 'action_required' ? 'Action Required' :
                 overallStatus === 'in_progress' ? 'Verification In Progress' :
                 'KYC Not Started'}
              </h2>
              <p className="text-[var(--text-muted)]">
                {overallStatus === 'verified' ? 'Your identity has been verified. You have full access to all features.' :
                 overallStatus === 'action_required' ? 'Some documents were rejected. Please resubmit.' :
                 overallStatus === 'in_progress' ? 'Your documents are being reviewed. This usually takes 1-2 business days.' :
                 'Submit your documents to complete verification.'}
              </p>
            </div>
          </div>
        </div>

        {/* Document Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {DOCUMENT_TYPES.map((docType) => {
            const submitted = kycData.find(d => d.document_type === docType.id);
            const statusInfo = submitted ? getStatusInfo(submitted.status) : null;
            const StatusIcon = statusInfo?.icon;

            return (
              <div key={docType.id} className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{docType.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{docType.description}</p>
                  </div>
                  {statusInfo && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded ${statusInfo.bg}`}>
                      <StatusIcon className={statusInfo.color} size={16} />
                      <span className={`text-sm ${statusInfo.color}`}>{statusInfo.label}</span>
                    </div>
                  )}
                </div>

                {!submitted ? (
                  <button
                    onClick={() => { setSelectedType(docType.id); setShowUploadModal(true); }}
                    className="w-full border-2 border-dashed border-[var(--border-subtle)] p-4 text-center hover:border-[var(--brand-primary)] transition-colors"
                  >
                    <Upload className="mx-auto text-[var(--text-muted)] mb-2" size={24} />
                    <span className="text-[var(--text-muted)]">Click to upload</span>
                  </button>
                ) : submitted.status === 'rejected' ? (
                  <div>
                    <p className="text-sm text-red-500 mb-2">Reason: {submitted.rejection_reason || 'Document not clear'}</p>
                    <button
                      onClick={() => { setSelectedType(docType.id); setShowUploadModal(true); }}
                      className="text-[var(--brand-primary)] text-sm hover:underline"
                    >
                      Resubmit Document
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-muted)]">
                    Submitted on {new Date(submitted.created_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] w-full max-w-md">
              <h2 className="text-xl font-bold text-white mb-4">Upload Document</h2>
              <p className="text-[var(--text-muted)] mb-6">
                Upload your {DOCUMENT_TYPES.find(d => d.id === selectedType)?.name}
              </p>

              <div className="border-2 border-dashed border-[var(--border-subtle)] p-8 text-center mb-6 hover:border-[var(--brand-primary)] cursor-pointer transition-colors">
                <Upload className="mx-auto text-[var(--text-muted)] mb-2" size={32} />
                <p className="text-[var(--text-muted)]">Click to select file or drag and drop</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">PDF, JPG, PNG (max 10MB)</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setShowUploadModal(false); setSelectedType(''); }}
                  className="flex-1 px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Compliance;
