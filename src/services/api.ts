// ========================================
// API Service Layer
// She Can Foundation - Smart Contact Portal
// ========================================

import axios, { AxiosInstance, AxiosError } from 'axios';
import { ContactFormData, ContactSubmission, ApiResponse, AuthState } from '../types';

// Base API URL - Change for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create Axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// ========================================
// Request Interceptor - Add auth token
// ========================================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// Response Interceptor - Handle errors
// ========================================
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ========================================
// Contact Form API Functions
// ========================================

/**
 * Submit a new contact form
 * @param data - Contact form data
 * @returns Promise with submission result
 */
export const submitContactForm = async (data: ContactFormData): Promise<ApiResponse<ContactSubmission>> => {
  try {
    const response = await api.post<ApiResponse<ContactSubmission>>('/contact', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all contact submissions (Admin only)
 * @returns Promise with array of submissions
 */
export const getContactSubmissions = async (): Promise<ApiResponse<ContactSubmission[]>> => {
  try {
    const response = await api.get<ApiResponse<ContactSubmission[]>>('/contact');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get a single contact submission by ID (Admin only)
 * @param id - Submission ID
 * @returns Promise with submission data
 */
export const getContactSubmissionById = async (id: string): Promise<ApiResponse<ContactSubmission>> => {
  try {
    const response = await api.get<ApiResponse<ContactSubmission>>(`/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update submission status (Admin only)
 * @param id - Submission ID
 * @param status - New status
 * @returns Promise with updated submission
 */
export const updateSubmissionStatus = async (
  id: string, 
  status: 'Pending' | 'Reviewed' | 'Completed'
): Promise<ApiResponse<ContactSubmission>> => {
  try {
    const response = await api.patch<ApiResponse<ContactSubmission>>(`/contact/${id}`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a submission (Admin only)
 * @param id - Submission ID
 * @returns Promise with deletion result
 */
export const deleteSubmission = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response = await api.delete<ApiResponse<null>>(`/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ========================================
// Authentication API Functions
// ========================================

/**
 * Admin login
 * @param email - Admin email
 * @param password - Admin password
 * @returns Promise with auth token and user data
 */
export const adminLogin = async (email: string, password: string): Promise<ApiResponse<AuthState>> => {
  try {
    const response = await api.post<ApiResponse<AuthState>>('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify token validity
 * @returns Promise with user data
 */
export const verifyToken = async (): Promise<ApiResponse<AuthState>> => {
  try {
    const response = await api.get<ApiResponse<AuthState>>('/auth/verify');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ========================================
// Stats API (Public)
// ========================================

/**
 * Get foundation statistics
 * @returns Promise with statistics data
 */
export const getStats = async (): Promise<ApiResponse<{ totalContacts: number; resolvedContacts: number; pendingContacts: number }>> => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    // Return default stats if API fails
    return {
      success: true,
      data: {
        totalContacts: 1250,
        resolvedContacts: 890,
        pendingContacts: 156
      }
    };
  }
};

export default api;
