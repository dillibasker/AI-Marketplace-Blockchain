import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addNotification } from '../components/common/GlobalNotification';
import { AiModel, ModelCategory } from '../types/marketplace';
import { mockModels } from '../data/mockData';

interface MarketplaceContextType {
  models: AiModel[];
  featuredModels: AiModel[];
  categories: ModelCategory[];
  loading: boolean;
  getModelById: (id: string) => AiModel | undefined;
  getModelsByCategory: (category: string) => AiModel[];
  purchaseModel: (modelId: string) => Promise<boolean>;
  searchModels: (query: string) => AiModel[];
}

const MarketplaceContext = createContext<MarketplaceContextType>({
  models: [],
  featuredModels: [],
  categories: [],
  loading: false,
  getModelById: () => undefined,
  getModelsByCategory: () => [],
  purchaseModel: async () => false,
  searchModels: () => [],
});

export const useMarketplace = () => useContext(MarketplaceContext);

interface MarketplaceProviderProps {
  children: ReactNode;
}

export const MarketplaceProvider: React.FC<MarketplaceProviderProps> = ({ children }) => {
  const [models, setModels] = useState<AiModel[]>(mockModels);
  const [loading, setLoading] = useState(false);
  
  // Extract all unique categories from models
  const categories: ModelCategory[] = [
    { id: 'image-generation', name: 'Image Generation', count: mockModels.filter(m => m.category === 'image-generation').length },
    { id: 'text-generation', name: 'Text Generation', count: mockModels.filter(m => m.category === 'text-generation').length },
    { id: 'audio-generation', name: 'Audio Generation', count: mockModels.filter(m => m.category === 'audio-generation').length },
    { id: 'data-analysis', name: 'Data Analysis', count: mockModels.filter(m => m.category === 'data-analysis').length },
    { id: 'computer-vision', name: 'Computer Vision', count: mockModels.filter(m => m.category === 'computer-vision').length },
  ];
  
  // Get featured models (top rated)
  const featuredModels = [...models]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Get model by ID
  const getModelById = (id: string): AiModel | undefined => {
    return models.find(model => model.id === id);
  };

  // Get models by category
  const getModelsByCategory = (category: string): AiModel[] => {
    return models.filter(model => model.category === category);
  };

  // Purchase a model
  const purchaseModel = async (modelId: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the model's ownership status in our state
      setModels(prevModels => 
        prevModels.map(model => 
          model.id === modelId 
            ? { ...model, owned: true } 
            : model
        )
      );
      
      addNotification('success', 'Model purchased successfully!');
      return true;
    } catch (error) {
      console.error('Error purchasing model:', error);
      addNotification('error', 'Failed to purchase model. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Search models
  const searchModels = (query: string): AiModel[] => {
    if (!query) return models;
    
    const lowerQuery = query.toLowerCase();
    return models.filter(model => 
      model.name.toLowerCase().includes(lowerQuery) || 
      model.description.toLowerCase().includes(lowerQuery) ||
      model.creator.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <MarketplaceContext.Provider
      value={{
        models,
        featuredModels,
        categories,
        loading,
        getModelById,
        getModelsByCategory,
        purchaseModel,
        searchModels,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};