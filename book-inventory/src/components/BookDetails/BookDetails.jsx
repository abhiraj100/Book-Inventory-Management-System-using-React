import React from 'react';
import { ArrowLeft, Edit, Trash2, Calendar, User, Building, BookOpen, DollarSign, Package } from 'lucide-react';

const BookDetails = ({ book, onBack, onEdit, onDelete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Inventory</span>
        </button>
        
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="lg:flex">
            {/* Book Cover Section */}
            <div className="lg:w-1/3 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="sticky top-8">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full max-w-sm mx-auto h-auto object-cover rounded-xl shadow-2xl"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop';
                  }}
                />
                
                {/* Action Buttons */}
                <div className="flex justify-center space-x-3 mt-6">
                  <button
                    onClick={() => onEdit(book)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Book</span>
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Book Information Section */}
            <div className="lg:w-2/3 p-8">
              {/* Title and Genre */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{book.title}</h1>
                <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                  {book.genre}
                </span>
              </div>
              
              {/* Basic Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <User className="w-6 h-6 text-blue-600" />
                  <div>
                    <span className="text-gray-600 text-sm">Author</span>
                    <p className="font-semibold text-gray-800">{book.author}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Building className="w-6 h-6 text-green-600" />
                  <div>
                    <span className="text-gray-600 text-sm">Publisher</span>
                    <p className="font-semibold text-gray-800">{book.publisher}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <div>
                    <span className="text-gray-600 text-sm">Published Date</span>
                    <p className="font-semibold text-gray-800">
                      {new Date(book.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  <div>
                    <span className="text-gray-600 text-sm">ISBN</span>
                    <p className="font-semibold text-gray-800 text-sm font-mono">{book.isbn}</p>
                  </div>
                </div>
              </div>
              
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{book.pages}</div>
                  <div className="text-sm opacity-90">Pages</div>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">${book.price}</div>
                  <div className="text-sm opacity-90">Price</div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white text-center col-span-2 md:col-span-1">
                  <Package className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{book.stock}</div>
                  <div className="text-sm opacity-90">In Stock</div>
                </div>
              </div>
              
              {/* Description Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {book.description || 'No description available for this book.'}
                  </p>
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600 text-sm">Stock Status:</span>
                    <p className={`font-semibold ${
                      book.stock > 20 ? 'text-green-600' :
                      book.stock > 10 ? 'text-yellow-600' :
                      book.stock > 0 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {book.stock > 20 ? 'In Stock' :
                       book.stock > 10 ? 'Limited Stock' :
                       book.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Availability:</span>
                    <p className="font-semibold text-gray-800">
                      {book.stock > 0 ? 'Available' : 'Currently Unavailable'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;