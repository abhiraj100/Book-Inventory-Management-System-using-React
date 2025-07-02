import React, { useState } from 'react';
import { Save, X, Upload, AlertCircle } from 'lucide-react';
import { validateForm } from '../../utils/validation';

const BookForm = ({ book, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedDate: '',
    publisher: '',
    genre: '',
    isbn: '',
    pages: '',
    price: '',
    stock: '',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
    ...book
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onSave({
      ...formData,
      pages: parseInt(formData.pages),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    });
    
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, coverImage: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {isEditing ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cover Image Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Cover
              </label>
              <div className="relative">
                <img
                  src={formData.coverImage}
                  alt="Book cover preview"
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
                  <label className="cursor-pointer bg-white bg-opacity-90 p-2 rounded-full">
                    <Upload className="w-6 h-6 text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Or paste image URL
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          {/* Form Fields Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter book title"
                  />
                  {errors.title && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.title}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.author ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter author name"
                  />
                  {errors.author && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.author}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.publisher ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter publisher name"
                  />
                  {errors.publisher && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.publisher}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Published Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="publishedDate"
                    value={formData.publishedDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.publishedDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.publishedDate && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.publishedDate}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.genre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Fiction, Romance, Mystery"
                  />
                  {errors.genre && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.genre}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ISBN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.isbn ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="978-0-123456-78-9"
                  />
                  {errors.isbn && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.isbn}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Numerical Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pages <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.pages ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                    min="1"
                  />
                  {errors.pages && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.pages}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    min="0"
                  />
                  {errors.price && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.price}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.stock ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.stock && (
                    <div className="flex items-center mt-1 text-red-500 text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.stock}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter a brief description of the book..."
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{isEditing ? 'Update' : 'Save'} Book</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;