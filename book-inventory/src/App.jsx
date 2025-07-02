import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import BookForm from './components/BookForm/BookForm';
import { initialBooks } from './data/mockData';
import './App.css';

const BookInventoryApp = () => {
  const [books, setBooks] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'details', 'form'
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  // Simulate API fetch on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBooks(initialBooks);
      setLoading(false);
    };
    
    fetchBooks();
  }, []);

  // Get unique genres for filter
  const genres = [...new Set(books.map(book => book.genre))];

  // Filter and sort books
  const filteredAndSortedBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !filterGenre || book.genre === filterGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleAddBook = () => {
    setEditingBook(null);
    setCurrentView('form');
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setCurrentView('form');
  };

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks(books.map(book => 
        book.id === editingBook.id ? { ...bookData, id: editingBook.id } : book
      ));
    } else {
      const newId = Math.max(...books.map(b => b.id)) + 1;
      setBooks([...books, { ...bookData, id: newId }]);
    }
    setCurrentView('list');
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book.id !== id));
      if (currentView === 'details') {
        setCurrentView('list');
      }
    }
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedBook(null);
  };

  const handleCancelForm = () => {
    setCurrentView('list');
    setEditingBook(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading books...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'details' && selectedBook) {
    return (
      <BookDetails
        book={selectedBook}
        onBack={handleBackToList}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
      />
    );
  }

  if (currentView === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <BookForm
          book={editingBook}
          onSave={handleSaveBook}
          onCancel={handleCancelForm}
          isEditing={!!editingBook}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header
          onAddBook={handleAddBook}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterGenre={filterGenre}
          setFilterGenre={setFilterGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          genres={genres}
        />
        
        <BookList
          books={filteredAndSortedBooks}
          onViewDetails={handleViewDetails}
          onEdit={handleEditBook}
          onDelete={handleDeleteBook}
        />
      </div>
    </div>
  );
};

export default BookInventoryApp;