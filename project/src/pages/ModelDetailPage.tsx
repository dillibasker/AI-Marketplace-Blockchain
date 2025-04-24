import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Check, Clock, Download, ExternalLink, Heart, Share2, ShieldCheck, Star, Tag, Wallet 
} from 'lucide-react';
import { useMarketplace } from '../contexts/MarketplaceContext';
import { useWallet } from '../contexts/WalletContext';
import { addNotification } from '../components/common/GlobalNotification';
import { mockReviews } from '../data/mockData';

const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getModelById, purchaseModel, loading } = useMarketplace();
  const { connected, connect } = useWallet();
  const [model, setModel] = useState(getModelById(id || ''));
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'pending' | 'success'>('idle');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update model when it changes
    setModel(getModelById(id || ''));
  }, [id, getModelById]);

  // Handle purchase
  const handlePurchase = async () => {
    if (!connected) {
      connect();
      return;
    }
    
    if (!model) return;
    
    setPurchaseStatus('pending');
    const success = await purchaseModel(model.id);
    
    if (success) {
      setPurchaseStatus('success');
      // Update the model in our local state
      setModel(getModelById(model.id));
    } else {
      setPurchaseStatus('idle');
    }
  };

  // Get reviews for this model
  const reviews = mockReviews[id || ''] || [];

  // If model not found
  if (!model) {
    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Model Not Found
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              The AI model you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/explore" className="btn btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <Link to="/explore" className="hover:text-primary-600 dark:hover:text-primary-400">Explore</Link>
              </li>
              <li className="flex items-center">
                <span className="mx-1">/</span>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{model.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Image and info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image */}
              <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm mb-6">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img 
                    src={model.imageUrl} 
                    alt={model.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">
                          {model.category}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30"
                          onClick={() => addNotification('info', 'Added to favorites!')}
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            addNotification('success', 'Link copied to clipboard!');
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="border-b border-slate-200 dark:border-slate-700">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`px-6 py-3 text-sm font-medium ${
                        activeTab === 'details'
                          ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className={`px-6 py-3 text-sm font-medium ${
                        activeTab === 'reviews'
                          ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Reviews ({reviews.length})
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'details' ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                          About this AI Model
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                          {model.description}
                        </p>
                        
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                          Key Features
                        </h3>
                        <ul className="list-disc pl-5 mb-6 text-slate-600 dark:text-slate-400 space-y-2">
                          <li>State-of-the-art performance with optimized inference</li>
                          <li>Pre-trained on diverse, high-quality datasets</li>
                          <li>Easy integration with popular frameworks</li>
                          <li>Customizable parameters for various use cases</li>
                          <li>Regular updates and improvements from the creator</li>
                        </ul>
                        
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                          Technical Specifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Model Type
                            </div>
                            <div className="text-slate-900 dark:text-white">
                              Transformer-based Neural Network
                            </div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              Parameters
                            </div>
                            <div className="text-slate-900 dark:text-white">
                              1.5 billion
                            </div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              File Size
                            </div>
                            <div className="text-slate-900 dark:text-white">
                              3.2 GB
                            </div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              License
                            </div>
                            <div className="text-slate-900 dark:text-white">
                              Commercial use permitted
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {model.tags.map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="reviews"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center mb-6">
                          <div className="flex items-center">
                            {Array(5).fill(0).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-5 h-5 ${
                                  i < Math.floor(model.rating) 
                                    ? "text-yellow-500 fill-yellow-500" 
                                    : "text-slate-300 dark:text-slate-600"
                                }`} 
                              />
                            ))}
                          </div>
                          <div className="ml-2 text-lg font-semibold text-slate-900 dark:text-white">
                            {model.rating.toFixed(1)}
                          </div>
                          <div className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                            ({model.reviews} reviews)
                          </div>
                        </div>
                        
                        {reviews.length > 0 ? (
                          <div className="space-y-6">
                            {reviews.map(review => (
                              <div key={review.id} className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-0">
                                <div className="flex items-start">
                                  <img 
                                    src={review.userAvatar} 
                                    alt={review.userName} 
                                    className="w-10 h-10 rounded-full mr-4"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-medium text-slate-900 dark:text-white">
                                        {review.userName}
                                      </h4>
                                      <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {review.date}
                                      </span>
                                    </div>
                                    <div className="flex items-center mt-1 mb-2">
                                      {Array(5).fill(0).map((_, i) => (
                                        <Star 
                                          key={i} 
                                          className={`w-4 h-4 ${
                                            i < review.rating 
                                              ? "text-yellow-500 fill-yellow-500" 
                                              : "text-slate-300 dark:text-slate-600"
                                          }`} 
                                        />
                                      ))}
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">
                                      {review.comment}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10">
                            <p className="text-slate-600 dark:text-slate-400">
                              No reviews yet. Be the first to review this model!
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Purchase info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 sticky top-24">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {model.name}
                </h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {model.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="mx-2 text-slate-400">•</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {model.reviews} reviews
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {model.price} {model.currency}
                  </div>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Clock className="w-4 h-4 mr-1" />
                    Created {model.created}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt={model.creator} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {model.creator}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {model.creatorWallet.slice(0, 6)}...{model.creatorWallet.slice(-4)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {model.owned ? (
                  <div className="space-y-4">
                    <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-900/30 rounded-lg p-4 flex items-center">
                      <Check className="w-5 h-5 text-success-500 mr-3 flex-shrink-0" />
                      <div className="text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-medium">You own this model</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          You can now use this AI model in your projects
                        </p>
                      </div>
                    </div>
                    
                    <button className="w-full btn btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download Model
                    </button>
                    
                    <button className="w-full btn btn-outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Documentation
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={handlePurchase}
                      disabled={loading || purchaseStatus === 'pending'}
                      className="w-full btn btn-primary mb-4"
                    >
                      {purchaseStatus === 'pending' ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Wallet className="w-4 h-4 mr-2" />
                          {connected ? 'Purchase Now' : 'Connect Wallet to Purchase'}
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 justify-center mb-6">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Secure blockchain transaction
                    </div>
                  </>
                )}
                
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                  <h4 className="font-medium text-sm text-slate-900 dark:text-white mb-3">
                    Purchase Includes:
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      Full model access
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      Commercial usage rights
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      6 months of updates
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      Technical documentation
                    </li>
                    <li className="flex items-center">
                      <Check className="w-4 h-4 text-success-500 mr-2" />
                      Integration examples
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailPage;