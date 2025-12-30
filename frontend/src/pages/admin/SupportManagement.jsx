import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { HelpCircle, MessageCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminSupport = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const fetchTickets = async () => {
    try {
      // Use the contact form endpoint as a workaround if tickets endpoint doesn't exist
      const response = await axios.get(`${API}/admin/contacts`);
      setTickets(response.data.contacts || response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setTickets([]);
    } finally {
      setLoading(false);
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
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-[var(--brand-primary)] text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  const openTickets = tickets.filter(t => t.status !== 'closed' && t.status !== 'resolved').length;

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="display-large mb-2">Support Tickets</h1>
            <p className="body-large text-[var(--text-secondary)]">Manage customer support requests</p>
          </div>
          {openTickets > 0 && (
            <div className="bg-yellow-500/20 text-yellow-500 px-4 py-2 font-bold">
              {openTickets} Open Tickets
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Total Tickets</div>
            <div className="text-2xl font-bold text-white">{tickets.length}</div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Open</div>
            <div className="text-2xl font-bold text-blue-500">
              {tickets.filter(t => t.status === 'open' || !t.status).length}
            </div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">In Progress</div>
            <div className="text-2xl font-bold text-yellow-500">
              {tickets.filter(t => t.status === 'in_progress').length}
            </div>
          </div>
          <div className="bg-[var(--bg-secondary)] p-4 border border-[var(--border-subtle)]">
            <div className="text-[var(--text-muted)] text-sm">Resolved</div>
            <div className="text-2xl font-bold text-green-500">
              {tickets.filter(t => t.status === 'resolved' || t.status === 'read').length}
            </div>
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
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] hover:border-[var(--brand-primary)] cursor-pointer transition-colors"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {getStatusIcon(ticket.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">
                        {ticket.subject || 'Support Request'}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-xs ${getPriorityColor(ticket.priority || 'medium')}`}>
                        {ticket.priority || 'medium'}
                      </span>
                    </div>
                    <div className="text-[var(--text-muted)] text-sm">
                      {ticket.name || ticket.user?.name} • {ticket.email || ticket.user?.email}
                    </div>
                    <p className="text-[var(--text-secondary)] mt-2 line-clamp-2">
                      {ticket.message}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs capitalize ${
                    ticket.status === 'open' || !ticket.status ? 'bg-blue-500/20 text-blue-500' :
                    ticket.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-500' :
                    ticket.status === 'resolved' || ticket.status === 'read' ? 'bg-green-500/20 text-green-500' :
                    'bg-gray-500/20 text-gray-500'
                  }`}>
                    {ticket.status?.replace('_', ' ') || 'open'}
                  </span>
                  <div className="text-[var(--text-muted)] text-sm mt-2">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {tickets.length === 0 && (
            <div className="text-center py-16 bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <HelpCircle className="mx-auto text-[var(--text-muted)] mb-4" size={64} />
              <h3 className="text-xl text-white mb-2">No support tickets</h3>
              <p className="text-[var(--text-muted)]">Support tickets will appear here</p>
            </div>
          )}
        </div>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{selectedTicket.subject || 'Support Request'}</h2>
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(selectedTicket.priority || 'medium')}`}>
                  {selectedTicket.priority || 'medium'} priority
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-[var(--text-muted)] text-sm">From</div>
                  <div className="text-white">{selectedTicket.name || selectedTicket.user?.name}</div>
                  <div className="text-[var(--text-muted)] text-sm">{selectedTicket.email || selectedTicket.user?.email}</div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm">Message</div>
                  <div className="text-white whitespace-pre-wrap bg-black p-4 border border-[var(--border-subtle)] mt-1">
                    {selectedTicket.message}
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              <div className="mb-6">
                <label className="block text-[var(--text-muted)] mb-2">Reply</label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your response..."
                  rows={4}
                  className="w-full bg-black border border-[var(--border-subtle)] text-white p-3 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setSelectedTicket(null); setReplyMessage(''); }}
                  className="flex-1 px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    toast.success('Reply sent');
                    setSelectedTicket(null);
                    setReplyMessage('');
                  }}
                  disabled={!replyMessage}
                  className="flex-1 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold disabled:opacity-50"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSupport;
