import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { AiModel } from '../../types/marketplace';

interface ModelCardProps {
  model: AiModel;
}

const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card overflow-hidden flex flex-col h-full"
    >
      {/* Image */}
      <Link to={`/model/${model.id}`}>
        <div className="relative h-48 w-full overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img 
            src={model.imageUrl} 
            alt={model.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {model.owned && (
            <div className="absolute top-2 right-2 bg-success-500 text-white text-xs font-medium px-2 py-1 rounded">
              Owned
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent py-2 px-3">
            <div className="flex items-center">
              <span className="text-white text-sm font-medium">{model.category}</span>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/model/${model.id}`} className="block">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
            {model.name}
          </h3>
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
          {model.description}
        </p>
        
        <div className="mt-auto">
          {/* Creator info */}
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            by <span className="font-medium text-primary-600 dark:text-primary-400">{model.creator}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
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
          
          {/* Price and action */}
          <div className="flex items-center justify-between">
            <div className="font-bold text-slate-900 dark:text-white">
              {model.price} {model.currency}
            </div>
            <Link to={`/model/${model.id}`} className="btn btn-primary py-1.5 px-3">
              <ShoppingCart className="w-4 h-4 mr-1" />
              View
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModelCard;