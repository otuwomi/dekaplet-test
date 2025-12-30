import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Mail, Eye, Check, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/admin/contacts`);
      setContacts(response.data.contacts || response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API}/admin/contacts/${id}`, { status: 'read' });
      setContacts(contacts.map(c => c.id === id ? {...c, status: 'read'} : c));
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to update status');
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

  const unreadCount = contacts.filter(c => c.status !== 'read').length;

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="display-large mb-2">Contact Messages</h1>
            <p className="body-large text-[var(--text-secondary)]">View and manage contact form submissions</p>
          </div>
          {unreadCount > 0 && (
            <div className="bg-red-500 text-white px-4 py-2 font-bold">
              {unreadCount} Unread
            </div>
          )}
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-[var(--bg-secondary)] p-6 border cursor-pointer transition-colors hover:border-[var(--brand-primary)] ${
                contact.status !== 'read' ? 'border-[var(--brand-primary)]/50' : 'border-[var(--border-subtle)]'
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    contact.status !== 'read' ? 'bg-[var(--brand-primary)]' : 'bg-[var(--bg-overlay)]'
                  }`}>
                    <Mail className={contact.status !== 'read' ? 'text-black' : 'text-[var(--text-muted)]'} size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                      {contact.status !== 'read' && (
                        <span className="px-2 py-0.5 bg-[var(--brand-primary)]/20 text-[var(--brand-primary)] text-xs">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-[var(--text-muted)] text-sm">{contact.email}</div>
                    <div className="text-white mt-2">{contact.subject || 'No Subject'}</div>
                    <p className="text-[var(--text-secondary)] mt-1 line-clamp-2">{contact.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[var(--text-muted)] text-sm">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-16 bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
              <Mail className="mx-auto text-[var(--text-muted)] mb-4" size={64} />
              <h3 className="text-xl text-white mb-2">No contact messages</h3>
              <p className="text-[var(--text-muted)]">Contact form submissions will appear here</p>
            </div>
          )}
        </div>

        {/* Contact Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[var(--bg-secondary)] p-6 border border-[var(--border-subtle)] w-full max-w-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Contact Message</h2>
                {selectedContact.status !== 'read' && (
                  <button
                    onClick={() => markAsRead(selectedContact.id)}
                    className="flex items-center gap-1 text-[var(--brand-primary)] text-sm hover:underline"
                  >
                    <Check size={16} /> Mark as Read
                  </button>
                )}
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-[var(--text-muted)] text-sm">From</div>
                  <div className="text-white">{selectedContact.name}</div>
                  <div className="text-[var(--text-muted)] text-sm">{selectedContact.email}</div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm">Subject</div>
                  <div className="text-white">{selectedContact.subject || 'No Subject'}</div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm">Message</div>
                  <div className="text-white whitespace-pre-wrap bg-black p-4 border border-[var(--border-subtle)] mt-1">
                    {selectedContact.message}
                  </div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)] text-sm">Received</div>
                  <div className="text-white">
                    {new Date(selectedContact.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedContact(null)}
                  className="flex-1 px-4 py-2 border border-[var(--border-subtle)] text-white hover:bg-[var(--bg-overlay)]"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Your inquiry'}`}
                  className="flex-1 bg-[var(--brand-primary)] text-black px-4 py-2 font-semibold text-center hover:bg-[var(--brand-primary-hover)]"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
