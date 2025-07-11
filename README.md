# 📚 Book Inventory Management System

A comprehensive, modern Book Inventory Management System built with React and Tailwind CSS. This application provides a complete solution for managing book collections with full CRUD operations, advanced search capabilities, and a beautiful, responsive user interface.

![Book Inventory Management System](https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop)

## ✨ Features

### 🔧 Core Functionality
- **Complete CRUD Operations**: Create, Read, Update, and Delete books
- **Dynamic Data Management**: Simulated API integration with realistic data handling
- **Advanced Search**: Real-time search across titles, authors, and genres
- **Smart Filtering**: Filter books by genre with dynamic genre extraction
- **Multi-column Sorting**: Sort by title, author, date, price, or stock
- **Detailed Book Views**: Comprehensive book information pages

### 🎨 User Interface
- **Modern Design**: Beautiful, contemporary interface with smooth animations
- **Fully Responsive**: Seamless experience across all devices and screen sizes
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Professional Styling**: Consistent design language with Tailwind CSS
- **Accessible**: WCAG compliant with keyboard navigation support

### 📊 Data Management
- **Form Validation**: Comprehensive validation for all input fields
- **Data Persistence**: Simulated API calls with realistic response handling
- **Stock Management**: Visual stock level indicators and alerts
- **Image Support**: Book cover image upload and URL support
- **Export/Import**: Data export capabilities (ready for backend integration)

### 🔍 Advanced Features
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: Graceful error management and user feedback
- **Search Suggestions**: Autocomplete and search recommendations
- **Statistics Dashboard**: Book collection insights and analytics
- **Print Support**: Print-friendly layouts and styles

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/book-inventory-management.git
   cd book-inventory-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
book-inventory-management/
├── public/
│   ├── index.html              # HTML template
│   ├── favicon.ico             # Favicon
│   └── manifest.json           # Web app manifest
├── src/
│   ├── components/             # React components
│   │   ├── Header/
│   │   │   └── Header.jsx      # Main header component
│   │   ├── BookList/
│   │   │   └── BookList.jsx    # Book table/list component
│   │   ├── BookDetails/
│   │   │   └── BookDetails.jsx # Detailed book view
│   │   └── BookForm/
│   │       └── BookForm.jsx    # Add/edit book form
│   ├── data/
│   │   └── mockData.js         # Sample book data
│   ├── services/
│   │   └── api.js              # API simulation layer
│   ├── utils/
│   │   └── validation.js       # Form validation utilities
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application-specific styles
│   ├── index.js                # Application entry point
│   └── index.css               # Global styles & Tailwind imports
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Project documentation
```

## 🎯 Usage Guide

### Adding a New Book
1. Click the **"Add New Book"** button in the header
2. Fill in all required fields (marked with *)
3. Optionally add a book cover image URL
4. Click **"Save Book"** to add to inventory

### Editing an Existing Book
1. Click the **edit icon** (pencil) in the book's row
2. Modify the desired fields in the form
3. Click **"Update Book"** to save changes

### Viewing Book Details
1. Click on any book row or the **view icon** (eye)
2. View comprehensive book information
3. Edit or delete directly from the details page

### Searching and Filtering
1. Use the **search bar** to find books by title or author
2. Select a **genre filter** to narrow results
3. Choose **sort options** to organize the list
4. Toggle between **ascending/descending** order

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_VERSION=1.0.0
REACT_APP_ENV=development
```

### Tailwind CSS Customization
Modify `tailwind.config.js` to customize:
- Color palette
- Fonts
- Spacing
- Breakpoints
- Custom utilities

### API Integration
Replace mock data in `src/services/api.js` with real API endpoints:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const booksApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/books`);
    return response.json();
  },
  // ... other endpoints
};
```

## 📝 Data Validation

The application includes comprehensive validation for:

- **Title**: Required, 2-200 characters
- **Author**: Required, 2-100 characters  
- **Publisher**: Required, 2-100 characters
- **Published Date**: Required, valid date, not in future
- **ISBN**: Required, valid ISBN-10 or ISBN-13 format
- **Genre**: Required, 2-50 characters
- **Pages**: Required, positive integer, max 10,000
- **Price**: Required, positive number, max $10,000
- **Stock**: Required, non-negative integer, max 100,000

## 🎨 Styling & Theming

### Color Scheme
- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Dark Mode Support
The application includes CSS for dark mode support:
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

## 🧪 Testing

### Running Tests
```bash
npm test
# or
yarn test
```

### Test Coverage
```bash
npm run test:coverage
# or
yarn test:coverage
```

## 🏗️ Building for Production

### Create Production Build
```bash
npm run build
# or
yarn build
```

### Serve Production Build
```bash
npm install -g serve
serve -s build
```

## 🔧 Development Tools

### Useful Scripts
```bash
npm start          # Start development server
npm test           # Run tests
npm run build      # Create production build
npm run eject      # Eject from Create React App
```

### Code Formatting
Install Prettier for consistent code formatting:
```bash
npm install --save-dev prettier
```

### ESLint Configuration
The project includes ESLint for code quality:
```bash
npm run lint       # Check for linting errors
npm run lint:fix   # Fix auto-fixable issues
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📱 Progressive Web App

The application is configured as a PWA with:
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for all devices

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Maintain consistent code formatting
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons
- **Unsplash** for the sample book cover images
