export interface AiModel {
  id: string;
  name: string;
  description: string;
  creator: string;
  creatorWallet: string;
  price: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  category: string;
  tags: string[];
  created: string;
  owned?: boolean;
  featured?: boolean;
}

export interface ModelCategory {
  id: string;
  name: string;
  count: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Transaction {
  id: string;
  modelId: string;
  modelName: string;
  buyerWallet: string;
  sellerWallet: string;
  price: number;
  currency: string;
  timestamp: string;
  transactionHash: string;
}