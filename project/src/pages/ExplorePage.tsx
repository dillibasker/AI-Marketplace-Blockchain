import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, SlidersHorizontal } from 'lucide-react';
import { useMarketplace } from '../contexts/MarketplaceContext';
import ModelCard from '../components/marketplace/ModelCard';

const ExplorePage: React.FC = () => {
  const location = useLocation();
  const { models, categories, searchModels } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredModels, setFilteredModels] = useState(models);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');

  // Parse URL parameters for category filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  // Filter and sort models
  useEffect(() => {
    let results = [...models];
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(model => model.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      results = searchModels(searchQuery);
    }
    
    // Apply sorting
    if (sortBy === 'popularity') {
      results.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === 'newest') {
      results.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    } else if (sortBy === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredModels(results);
  }, [models, selectedCategory, searchQuery, sortBy, searchModels]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore AI Models
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Discover and purchase state-of-the-art AI models from creators around the world
          </p>
        </motion.div>

        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10"
                placeholder="Search AI models..."
              />
            </div>
            
            {/* Toggle filters on mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn btn-outline"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
            
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input appearance-none pr-10"
              >
                <option value="popularity">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <SlidersHorizontal className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main content with filters and results */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                    selectedCategory === null
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-medium'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                  }`}
                >
                  All Categories
                </button>
                
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-medium'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {category.name} <span className="text-slate-500 dark:text-slate-400 ml-1">({category.count})</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">0 ETH</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">1 ETH</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
                    >
                      {Array(rating).fill(0).map((_, i) => (
                        <Star key={i} className="inline-block w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                      {Array(5 - rating).fill(0).map((_, i) => (
                        <Star key={i} className="inline-block w-4 h-4 text-slate-300 dark:text-slate-600" />
                      ))}
                      <span className="ml-2">& Up</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results grid */}
          <div className="flex-grow">
            {filteredModels.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredModels.map(model => (
                  <motion.div key={model.id} variants={itemVariants}>
                    <ModelCard model={model} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl">
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  No AI models found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="mt-4 btn btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Star component for ratings
const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

export default ExplorePage;