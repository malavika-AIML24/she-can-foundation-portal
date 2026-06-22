// ========================================
// Admin Dashboard Page
// She Can Foundation - Smart Contact Portal
// ========================================

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiSearch, 
  HiFilter, 
  HiTrash, 
  HiEye, 
  HiLogout,
  HiChevronDown,
  HiX
} from 'react-icons/hi';
import { getContactSubmissions, updateSubmissionStatus, deleteSubmission } from '../../services/api';
import { ContactSubmission } from '../../types';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchSubmissions();
  }, [navigate]);

  // Fetch submissions
  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const response = await getContactSubmissions();
      if (response.success && response.data) {
        setSubmissions(response.data);
      } else {
        // Demo data for development
        setSubmissions([
          {
            _id: '1',
            name: 'Priya Sharma',
            email: 'priya.sharma@gmail.com',
            phone: '+91 98765 43210',
            subject: 'Program Information',
            message: 'I would like to know more about your upcoming web development bootcamp. What are the prerequisites and how can I apply?',
            status: 'Pending',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            _id: '2',
            name: 'Ananya Patel',
            email: 'ananya.p@outlook.com',
            phone: '+91 87654 32109',
            subject: 'Mentorship',
            message: 'I am a senior software engineer with 8 years of experience. I would love to mentor women who are starting their tech careers.',
            status: 'Reviewed',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            updatedAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            _id: '3',
            name: 'Sneha Gupta',
            email: 'sneha.g@yahoo.com',
            phone: '+91 76543 21098',
            subject: 'General Inquiry',
            message: 'How can I contribute to your foundation? I am interested in volunteering for your upcoming events.',
            status: 'Completed',
            createdAt: new Date(Date.now() - 259200000).toISOString(),
            updatedAt: new Date(Date.now() - 172800000).toISOString(),
          },
          {
            _id: '4',
            name: 'Meera Reddy',
            email: 'meera.r@techcorp.com',
            phone: '+91 65432 10987',
            subject: 'Partnership',
            message: 'Our company would like to partner with She Can Foundation to sponsor scholarships for women in tech.',
            status: 'Pending',
            createdAt: new Date(Date.now() - 345600000).toISOString(),
            updatedAt: new Date(Date.now() - 345600000).toISOString(),
          },
          {
            _id: '5',
            name: 'Kavya Nair',
            email: 'kavya.n@gmail.com',
            phone: '+91 54321 09876',
            subject: 'Feedback',
            message: 'I completed your React bootcamp last month and it was amazing! The content quality and mentor support were exceptional.',
            status: 'Completed',
            createdAt: new Date(Date.now() - 432000000).toISOString(),
            updatedAt: new Date(Date.now() - 259200000).toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [submissions, searchQuery, statusFilter]);

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: 'Pending' | 'Reviewed' | 'Completed') => {
    try {
      const response = await updateSubmissionStatus(id, newStatus);
      if (response.success) {
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub._id === id ? { ...sub, status: newStatus, updatedAt: new Date().toISOString() } : sub
          )
        );
      } else {
        // Demo update
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub._id === id ? { ...sub, status: newStatus, updatedAt: new Date().toISOString() } : sub
          )
        );
      }
    } catch (error) {
      // Demo update
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub._id === id ? { ...sub, status: newStatus, updatedAt: new Date().toISOString() } : sub
        )
      );
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteSubmission(id);
      if (response.success) {
        setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
      } else {
        // Demo delete
        setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
      }
    } catch (error) {
      // Demo delete
      setSubmissions((prev) => prev.filter((sub) => sub._id !== id));
    }
    setShowDeleteModal(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Status color mapping
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Reviewed: 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
  };

  // Stats
  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === 'Pending').length,
    reviewed: submissions.filter((s) => s.status === 'Reviewed').length,
    completed: submissions.filter((s) => s.status === 'Completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold">SC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Admin Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <HiLogout className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Submissions', value: stats.total, color: 'purple' },
            { label: 'Pending', value: stats.pending, color: 'yellow' },
            { label: 'Reviewed', value: stats.reviewed, color: 'blue' },
            { label: 'Completed', value: stats.completed, color: 'green' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-600 mt-1`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-transparent rounded-xl focus:border-purple-500 focus:bg-white transition-colors"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <HiFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-10 py-3 bg-gray-100 border border-transparent rounded-xl focus:border-purple-500 focus:bg-white appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Completed">Completed</option>
              </select>
              <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-gray-500">Loading submissions...</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">No submissions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSubmissions.map((submission) => (
                    <motion.tr
                      key={submission._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                            {submission.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{submission.name}</p>
                            <p className="text-sm text-gray-500">{submission.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-gray-600">{submission.subject}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-gray-500">
                          {formatDate(submission.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <select
                            value={submission.status}
                            onChange={(e) =>
                              handleStatusUpdate(
                                submission._id,
                                e.target.value as 'Pending' | 'Reviewed' | 'Completed'
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium appearance-none cursor-pointer pr-8 ${
                              statusColors[submission.status]
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <HiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <HiEye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(submission._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedSubmission(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                    {selectedSubmission.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{selectedSubmission.name}</h4>
                    <p className="text-gray-500">{selectedSubmission.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedSubmission.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="font-medium text-gray-900">{selectedSubmission.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(selectedSubmission.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[selectedSubmission.status]}`}>
                      {selectedSubmission.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Message</p>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedSubmission.message}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`mailto:${selectedSubmission.email}`}
                  className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-xl font-medium text-center hover:bg-purple-700 transition-colors"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <HiTrash className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Submission?</h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. The submission will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => showDeleteModal && handleDelete(showDeleteModal)}
                  className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
