// Form validation utilities
export const validateForm = (book) => {
  const errors = {};
  
  // Title validation
  if (!book.title || !book.title.trim()) {
    errors.title = 'Title is required';
  } else if (book.title.trim().length < 2) {
    errors.title = 'Title must be at least 2 characters long';
  } else if (book.title.trim().length > 200) {
    errors.title = 'Title must be less than 200 characters';
  }
  
  // Author validation
  if (!book.author || !book.author.trim()) {
    errors.author = 'Author is required';
  } else if (book.author.trim().length < 2) {
    errors.author = 'Author name must be at least 2 characters long';
  } else if (book.author.trim().length > 100) {
    errors.author = 'Author name must be less than 100 characters';
  }
  
  // Publisher validation
  if (!book.publisher || !book.publisher.trim()) {
    errors.publisher = 'Publisher is required';
  } else if (book.publisher.trim().length < 2) {
    errors.publisher = 'Publisher name must be at least 2 characters long';
  } else if (book.publisher.trim().length > 100) {
    errors.publisher = 'Publisher name must be less than 100 characters';
  }
  
  // Published date validation
  if (!book.publishedDate) {
    errors.publishedDate = 'Published date is required';
  } else {
    const publishedDate = new Date(book.publishedDate);
    const currentDate = new Date();
    const earliestDate = new Date('1000-01-01');
    
    if (publishedDate > currentDate) {
      errors.publishedDate = 'Published date cannot be in the future';
    } else if (publishedDate < earliestDate) {
      errors.publishedDate = 'Please enter a valid published date';
    }
  }
  
  // ISBN validation
  if (!book.isbn || !book.isbn.trim()) {
    errors.isbn = 'ISBN is required';
  } else if (!isValidISBN(book.isbn.trim())) {
    errors.isbn = 'Please enter a valid ISBN format (e.g., 978-0-123456-78-9)';
  }
  
  // Genre validation
  if (!book.genre || !book.genre.trim()) {
    errors.genre = 'Genre is required';
  } else if (book.genre.trim().length < 2) {
    errors.genre = 'Genre must be at least 2 characters long';
  } else if (book.genre.trim().length > 50) {
    errors.genre = 'Genre must be less than 50 characters';
  }
  
  // Pages validation
  const pages = parseInt(book.pages);
  if (!book.pages || isNaN(pages)) {
    errors.pages = 'Number of pages is required';
  } else if (pages <= 0) {
    errors.pages = 'Number of pages must be greater than 0';
  } else if (pages > 10000) {
    errors.pages = 'Number of pages seems unrealistic (max: 10,000)';
  }
  
  // Price validation
  const price = parseFloat(book.price);
  if (!book.price || isNaN(price)) {
    errors.price = 'Price is required';
  } else if (price <= 0) {
    errors.price = 'Price must be greater than 0';
  } else if (price > 10000) {
    errors.price = 'Price seems unrealistic (max: $10,000)';
  }
  
  // Stock validation
  const stock = parseInt(book.stock);
  if (book.stock === '' || isNaN(stock)) {
    errors.stock = 'Stock quantity is required';
  } else if (stock < 0) {
    errors.stock = 'Stock quantity cannot be negative';
  } else if (stock > 100000) {
    errors.stock = 'Stock quantity seems unrealistic (max: 100,000)';
  }
  
  // Description validation (optional field)
  if (book.description && book.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }
  
  return errors;
};

// ISBN validation helper function
const isValidISBN = (isbn) => {
  // Remove any hyphens, spaces, or other non-digit characters except X
  const cleanISBN = isbn.replace(/[^\dX]/gi, '');
  
  // Check for ISBN-10 (10 digits, possibly ending with X)
  if (cleanISBN.length === 10) {
    return isValidISBN10(cleanISBN);
  }
  
  // Check for ISBN-13 (13 digits)
  if (cleanISBN.length === 13) {
    return isValidISBN13(cleanISBN);
  }
  
  return false;
};

// ISBN-10 validation
const isValidISBN10 = (isbn) => {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(isbn[i]);
    if (isNaN(digit)) return false;
    sum += digit * (10 - i);
  }
  
  const lastChar = isbn[9].toUpperCase();
  const checkDigit = lastChar === 'X' ? 10 : parseInt(lastChar);
  if (isNaN(checkDigit) && lastChar !== 'X') return false;
  
  sum += checkDigit;
  return sum % 11 === 0;
};

// ISBN-13 validation
const isValidISBN13 = (isbn) => {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn[i]);
    if (isNaN(digit)) return false;
    sum += digit * (i % 2 === 0 ? 1 : 3);
  }
  
  const checkDigit = parseInt(isbn[12]);
  if (isNaN(checkDigit)) return false;
  
  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  return checkDigit === calculatedCheckDigit;
};

// Email validation helper (if needed for future features)
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation helper (if needed for future features)
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// URL validation helper
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Number validation helpers
export const isPositiveInteger = (value) => {
  const num = parseInt(value);
  return !isNaN(num) && num > 0 && Number.isInteger(num);
};

export const isNonNegativeInteger = (value) => {
  const num = parseInt(value);
  return !isNaN(num) && num >= 0 && Number.isInteger(num);
};

export const isPositiveNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

export const isNonNegativeNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0;
};