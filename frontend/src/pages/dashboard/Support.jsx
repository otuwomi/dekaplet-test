import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { HelpCircle, Plus, MessageCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API}/user/support-tickets`);
      setTickets(response.data.tickets || []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    setCreating(true);
    try {
      const response = await axios.post(`${API}/user/support-tickets`, formData);
      setTickets([response.data.ticket, ...tickets]);
      toast.success('Support ticket created');
      setShowCreateModal(false);
      setFormData({ subject: '', message: '', priority: 'medium' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create ticket');
    } finally {
      setCreating(false);
    }
  };

  const closeTicket = async (id) => {
    try {
      await axios.post(`${API}/user/support-tickets/${id}/close`);
      setTickets(tickets.map(t => t.id === id ? {...t, status: 'closed'} : t));
      toast.success('Ticket closed');
    } catch (error) {
      toast.error('Failed to close ticket');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <MessageCircle className="text-blue-500" size={20} />;
      case 'in_progress': return <Clock className="text-yellow-500" size={20} />;
      case 'resolved': return <CheckCircle className="text-green-500" size={20} />;
      case 'closed': return <XCircle className="text-gray-500" size={20} />;
      default: return <HelpCircle className="text-gray-500" size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500';
      case 'low': return 'bg-green-500/20 text-green-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="display-large mb-2">Support</h1>
            <p className="body-large text-[var(--text-secondary)]">Get help from our support team</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors"
          >
            <Plus size={20} />
            New Ticket
          </button>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(ticket.status)}
                  <div>
                    <h3 className="text-lg font-bold text-white">{ticket.subject}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority} priority
                      </span>
                      <span className="text-[var(--text-muted)] text-sm">#{ticket.id}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs capitalize ${
                    ticket.status === 'open' ? 'bg-blue-500/20 text-blue-500' :
                    ticket.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-500' :
                    ticket.status === 'resolved' ? 'bg-green-500/20 text-green-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {ticket.status?.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">{ticket.message}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-muted)]">
                  Created {new Date(ticket.created_at).toLocaleDateString()}
                </span>
                {ticket.status !== 'closed' && ticket.status !== 'resolved' && (
                  <button
                    onClick={() => closeTicket(ticket.id)}
                    className="text-sm text-red-500 hover:text-red-400"
                  >
                    Close Ticket
                  </button>
                )}
              </div>
            </div>
          ))}

          {tickets.length === 0 && (
            <div className="text-center py-16 bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <HelpCircle className="mx-auto text-[var(--text-muted)] mb-4" size={64} />
              <h3 className="text-xl text-white mb-2">No support tickets</h3>
              <p className="text-[var(--text-muted)] mb-4">Need help? Create a support ticket</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-[var(--brand-primary)] text-black px-6 py-2 font-semibold"
              >
                Create Ticket
              </button>
            </div>
          )}
        </div>

        {/* Create Ticket Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] w-full max-w-lg">
              <h2 className="text-xl font-bold text-white mb-4">Create Support Ticket</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-[var(--text-muted)] mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Brief description of your issue"
                    className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-[var(--text-muted)] mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="w-full bg-black border border-[var(--border-subtle)] text-white p-3"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-[var(--text-muted)] mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Describe your issue in detail..."
                    rows={5}
                    className="w-full bg-black border border-[var(--border-subtle)] text-white p-3 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Submit Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Support;
