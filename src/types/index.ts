// ========================================
// TypeScript Type Definitions
// She Can Foundation - Smart Contact Portal
// ========================================

// Contact Form Data Interface
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Contact Submission Response
export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Pending' | 'Reviewed' | 'Completed';
  createdAt: string;
  updatedAt: string;
}

// Admin User Interface
export interface AdminUser {
  _id: string;
  email: string;
  role: string;
}

// Authentication State
export interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
}

// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Statistics Interface
export interface Stats {
  label: string;
  value: string;
  icon: string;
  description: string;
}
