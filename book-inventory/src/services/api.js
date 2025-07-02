// API service for Book Inventory Management System
// This file simulates API calls that would normally be made to a backend server

import { initialBooks, apiDelay, generateId } from '../data/mockData';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 5000; // 5 seconds

// Simulated database - in a real app, this would be handled by the backend
let booksDatabase = [...initialBooks];

// API Response wrapper
const createApiResponse = (data, success = true, message = '') => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString()
});

// Error handling wrapper
const handleApiError = (error, operation) => {
  console.error(`API Error in ${operation}:`, error);
  return createApiResponse(null, false, `Failed to ${operation}: ${error.message}`);
};

// Books API
export const booksApi = {
  // Get all books
  getAll: async (filters = {}) => {
    try {
      await apiDelay(800); // Simulate network delay
      
      let filteredBooks = [...booksDatabase];
      
      // Apply filters
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.genre.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters.genre) {
        filteredBooks = filteredBooks.filter(book => book.genre === filters.genre);
      }
      
      if (filters.author) {
        filteredBooks = filteredBooks.filter(book => 
          book.author.toLowerCase().includes(filters.author.toLowerCase())
        );
      }
      
      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        filteredBooks = filteredBooks.filter(book => 
          book.price >= min && book.price <= max
        );
      }
      
      // Apply sorting
      if (filters.sortBy) {
        filteredBooks.sort((a, b) => {
          const { field, direction } = filters.sortBy;
          let aValue = a[field];
          let bValue = b[field];
          
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
          
          const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          return direction === 'desc' ? -comparison : comparison;
        });
      }
      
      // Apply pagination
      if (filters.pagination) {
        const { page, limit } = filters.pagination;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
        
        return createApiResponse({
          books: paginatedBooks,
          pagination: {
            page,
            limit,
            total: filteredBooks.length,
            totalPages: Math.ceil(filteredBooks.length / limit)
          }
        });
      }
      
      return createApiResponse(filteredBooks);
    } catch (error) {
      return handleApiError(error, 'fetch books');
    }
  },

  // Get book by ID
  getById: async (id) => {
    try {
      await apiDelay(300);
      
      const book = booksDatabase.find(book => book.id === parseInt(id));
      if (!book) {
        return createApiResponse(null, false, 'Book not found');
      }
      
      return createApiResponse(book);
    } catch (error) {
      return handleApiError(error, 'fetch book');
    }
  },

  // Create new book
  create: async (bookData) => {
    try {
      await apiDelay(1000);
      
      const newBook = {
        ...bookData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      booksDatabase.push(newBook);
      
      return createApiResponse(newBook, true, 'Book created successfully');
    } catch (error) {
      return handleApiError(error, 'create book');
    }
  },

  // Update existing book
  update: async (id, bookData) => {
    try {
      await apiDelay(800);
      
      const bookIndex = booksDatabase.findIndex(book => book.id === parseInt(id));
      if (bookIndex === -1) {
        return createApiResponse(null, false, 'Book not found');
      }
      
      const updatedBook = {
        ...booksDatabase[bookIndex],
        ...bookData,
        id: parseInt(id), // Ensure ID doesn't change
        updatedAt: new Date().toISOString()
      };
      
      booksDatabase[bookIndex] = updatedBook;
      
      return createApiResponse(updatedBook, true, 'Book updated successfully');
    } catch (error) {
      return handleApiError(error, 'update book');
    }
  },

  // Delete book
  delete: async (id) => {
    try {
      await apiDelay(500);
      
      const bookIndex = booksDatabase.findIndex(book => book.id === parseInt(id));
      if (bookIndex === -1) {
        return createApiResponse(null, false, 'Book not found');
      }
      
      const deletedBook = booksDatabase.splice(bookIndex, 1)[0];
      
      return createApiResponse(deletedBook, true, 'Book deleted successfully');
    } catch (error) {
      return handleApiError(error, 'delete book');
    }
  },

  // Get book statistics
  getStats: async () => {
    try {
      await apiDelay(400);
      
      const stats = {
        totalBooks: booksDatabase.length,
        totalValue: booksDatabase.reduce((sum, book) => sum + (book.price * book.stock), 0),
        totalStock: booksDatabase.reduce((sum, book) => sum + book.stock, 0),
        averagePrice: booksDatabase.reduce((sum, book) => sum + book.price, 0) / booksDatabase.length,
        genreDistribution: booksDatabase.reduce((acc, book) => {
          acc[book.genre] = (acc[book.genre] || 0) + 1;
          return acc;
        }, {}),
        lowStockBooks: booksDatabase.filter(book => book.stock <= 10).length,
        outOfStockBooks: booksDatabase.filter(book => book.stock === 0).length
      };
      
      return createApiResponse(stats);
    } catch (error) {
      return handleApiError(error, 'fetch statistics');
    }
  },

  // Search books with autocomplete
  search: async (query, limit = 10) => {
    try {
      await apiDelay(200);
      
      const searchTerm = query.toLowerCase();
      const results = booksDatabase
        .filter(book => 
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm) ||
          book.genre.toLowerCase().includes(searchTerm)
        )
        .slice(0, limit)
        .map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          genre: book.genre
        }));
      
      return createApiResponse(results);
    } catch (error) {
      return handleApiError(error, 'search books');
    }
  }
};

// Upload API (for book covers)
export const uploadApi = {
  // Upload book cover image
  uploadCover: async (file) => {
    try {
      await apiDelay(2000); // Simulate file upload delay
      
      // In a real app, you would upload to a file storage service
      // For demo purposes, we'll just return a simulated URL
      const imageUrl = `https://example.com/uploads/${file.name}`;
      
      return createApiResponse({ imageUrl }, true, 'Image uploaded successfully');
    } catch (error) {
      return handleApiError(error, 'upload image');
    }
  }
};

// User API (for future authentication features)
export const userApi = {
  // Get current user profile
  getProfile: async () => {
    try {
      await apiDelay(300);
      
      // Simulated user data
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        permissions: ['read', 'write', 'delete']
      };
      
      return createApiResponse(user);
    } catch (error) {
      return handleApiError(error, 'fetch user profile');
    }
  }
};

// Export/Import API
export const dataApi = {
  // Export books data
  exportBooks: async (format = 'json') => {
    try {
      await apiDelay(1500);
      
      let exportData;
      const timestamp = new Date().toISOString().slice(0, 10);
      
      switch (format.toLowerCase()) {
        case 'csv':
          exportData = convertToCSV(booksDatabase);
          break;
        case 'json':
        default:
          exportData = JSON.stringify(booksDatabase, null, 2);
          break;
      }
      
      return createApiResponse({
        data: exportData,
        filename: `books_export_${timestamp}.${format}`,
        format
      });
    } catch (error) {
      return handleApiError(error, 'export books');
    }
  },

  // Import books data
  importBooks: async (file) => {
    try {
      await apiDelay(2000);
      
      // In a real app, you would parse the uploaded file
      // For demo purposes, we'll simulate a successful import
      const importedCount = Math.floor(Math.random() * 10) + 1;
      
      return createApiResponse(
        { importedCount },
        true,
        `Successfully imported ${importedCount} books`
      );
    } catch (error) {
      return handleApiError(error, 'import books');
    }
  }
};

// Helper function to convert JSON to CSV
const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      }).join(',')
    )
  ].join('\n');
  
  return csvContent;
};

// Error types for better error handling
export const ApiErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  SERVER_ERROR: 'SERVER_ERROR'
};

// API configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    // Add authorization headers when implementing authentication
    // 'Authorization': `Bearer ${getAuthToken()}`
  }
};

export default {
  books: booksApi,
  upload: uploadApi,
  user: userApi,
  data: dataApi
};