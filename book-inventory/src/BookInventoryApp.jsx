import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  X,
  Save,
  ArrowLeft,
  Calendar,
  User,
  Building,
} from "lucide-react";

const BookInventoryApp = () => {
  const [books, setBooks] = useState(initialBooks);
  const [currentView, setCurrentView] = useState("list"); // 'list', 'details', 'form'
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  // Get unique genres for filter
  const genres = [...new Set(books.map((book) => book.genre))];

  // Filter and sort books
  const filteredAndSortedBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !filterGenre || book.genre === filterGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleAddBook = () => {
    setEditingBook(null);
    setCurrentView("form");
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setCurrentView("form");
  };

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks(
        books.map((book) =>
          book.id === editingBook.id
            ? { ...bookData, id: editingBook.id }
            : book
        )
      );
    } else {
      const newId = Math.max(...books.map((b) => b.id)) + 1;
      setBooks([...books, { ...bookData, id: newId }]);
    }
    setCurrentView("list");
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
      if (currentView === "details") {
        setCurrentView("list");
      }
    }
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setCurrentView("details");
  };

  if (currentView === "details" && selectedBook) {
    return (
      <BookDetails
        book={selectedBook}
        onBack={() => setCurrentView("list")}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Book Inventory Management
              </h1>
            </div>
            <button
              onClick={handleAddBook}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Book</span>
            </button>
          </div>

          {/* Search and Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="publishedDate">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
            </button>
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {book.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Published:{" "}
                            {new Date(book.publishedDate).getFullYear()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {book.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${book.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          book.stock > 20
                            ? "bg-green-100 text-green-800"
                            : book.stock > 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(book)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditBook(book)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors"
                          title="Edit Book"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                          title="Delete Book"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No books found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Book Form Modal */}
      {currentView === "form" && (
        <BookForm
          book={editingBook}
          onSave={handleSaveBook}
          onCancel={() => setCurrentView("list")}
          isEditing={!!editingBook}
        />
      )}
    </div>
  );
};

export default BookInventoryApp;
