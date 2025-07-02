import React from "react";
import { BookOpen, Plus, Search, Filter } from "lucide-react";

const Header = ({
  onAddBook,
  searchTerm,
  setSearchTerm,
  filterGenre,
  setFilterGenre,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  genres,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Title and Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Book Inventory Management
          </h1>
        </div>
        <button
          onClick={onAddBook}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-20 pr-4 py-2  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Genre Filter */}
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="publishedDate">Sort by Date</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
        </select>

        {/* Sort Order */}
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
        >
          <Filter className="w-4 h-4" />
          <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
