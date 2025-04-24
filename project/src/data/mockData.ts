import { AiModel, Review, Transaction } from '../types/marketplace';

// Mock AI Models
export const mockModels: AiModel[] = [
  {
    id: 'model-1',
    name: 'ImageCraft Pro',
    description: 'Advanced image generation model with photorealistic outputs. Perfect for creative professionals and designers looking for high-quality visuals.',
    creator: 'AILabs',
    creatorWallet: '0x7c1Ea80e9d343c9613C516BbDa4A7a80323949E6',
    price: 0.5,
    currency: 'ETH',
    imageUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviews: 124,
    category: 'image-generation',
    tags: ['image', 'photorealistic', 'generative', 'creative'],
    created: '2024-08-12',
    featured: true
  },
  {
    id: 'model-2',
    name: 'TextGenius',
    description: 'State-of-the-art language model for content generation, summarization, and creative writing assistance.',
    creator: 'OpenMind',
    creatorWallet: '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
    price: 0.3,
    currency: 'ETH',
    imageUrl: 'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    reviews: 87,
    category: 'text-generation',
    tags: ['text', 'language', 'writing', 'content'],
    created: '2024-09-05'
  },
  {
    id: 'model-3',
    name: 'SoundWave AI',
    description: 'Generate professional-quality music, sound effects, and voice narration for any creative project.',
    creator: 'AudioLabs',
    creatorWallet: '0x9F7A946d935c8Efc7A8329C0d8bD46c7f4F936Bf',
    price: 0.25,
    currency: 'ETH',
    imageUrl: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviews: 62,
    category: 'audio-generation',
    tags: ['audio', 'music', 'voice', 'sound effects'],
    created: '2024-07-22'
  },
  {
    id: 'model-4',
    name: 'DataSense',
    description: 'Advanced analytics model for processing and visualizing complex datasets with minimal configuration.',
    creator: 'DataMinds',
    creatorWallet: '0x3d2e397F94e415d7773E72e44D5B5338a99E77d9',
    price: 0.4,
    currency: 'ETH',
    imageUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviews: 43,
    category: 'data-analysis',
    tags: ['data', 'analytics', 'visualization', 'insights'],
    created: '2024-09-18'
  },
  {
    id: 'model-5',
    name: 'VisionDetect',
    description: 'Computer vision model for object detection, face recognition, and scene understanding.',
    creator: 'VisionTech',
    creatorWallet: '0x1Dc4c1cEf673fBE5f5716761C72512B5a8c24d8A',
    price: 0.35,
    currency: 'ETH',
    imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.4,
    reviews: 56,
    category: 'computer-vision',
    tags: ['vision', 'detection', 'recognition', 'perception'],
    created: '2024-08-30'
  },
  {
    id: 'model-6',
    name: 'CreativeFlow',
    description: 'Multi-modal creative assistant that generates art in various styles based on text descriptions.',
    creator: 'ArtificialCreative',
    creatorWallet: '0x6E8ea9E1A5F9d982Ed900fE0A33F5DF3d4C5b1fA',
    price: 0.45,
    currency: 'ETH',
    imageUrl: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviews: 112,
    category: 'image-generation',
    tags: ['art', 'creative', 'styles', 'generation'],
    created: '2024-06-15',
    featured: true
  },
  {
    id: 'model-7',
    name: 'CodeCopilot',
    description: 'AI assistant for software development that suggests code snippets and helps solve programming challenges.',
    creator: 'DevIntelligence',
    creatorWallet: '0x4B3aF9D19E8D98d97B58c10c5fD487a32E44a920',
    price: 0.6,
    currency: 'ETH',
    imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviews: 93,
    category: 'text-generation',
    tags: ['code', 'programming', 'development', 'assistance'],
    created: '2024-08-05',
    featured: true
  },
  {
    id: 'model-8',
    name: 'VoiceClone',
    description: 'Generate natural-sounding speech in your own voice or choose from hundreds of preset voices.',
    creator: 'SpeechLabs',
    creatorWallet: '0x2C8950FCb5dE16CDff2dCB6C4dD402fE7D846b71',
    price: 0.35,
    currency: 'ETH',
    imageUrl: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    reviews: 78,
    category: 'audio-generation',
    tags: ['voice', 'speech', 'cloning', 'narration'],
    created: '2024-07-10'
  }
];

// Mock Reviews
export const mockReviews: { [key: string]: Review[] } = {
  'model-1': [
    {
      id: 'review-1',
      userId: 'user-1',
      userName: 'Alex Johnson',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      comment: "Amazing quality! This model produces the most realistic images I've ever seen from AI.",
      date: '2024-09-23'
    },
    {
      id: 'review-2',
      userId: 'user-2',
      userName: 'Sarah Chen',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
      comment: 'Great results for most of my projects. Occasionally struggles with complex lighting scenarios.',
      date: '2024-09-15'
    },
    {
      id: 'review-3',
      userId: 'user-3',
      userName: 'Michael Rodriguez',
      userAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 5,
      comment: 'Best investment I\'ve made for my design workflow. Saves me hours of work!',
      date: '2024-09-03'
    }
  ]
};

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'tx-1',
    modelId: 'model-1',
    modelName: 'ImageCraft Pro',
    buyerWallet: '0x1234567890123456789012345678901234567890',
    sellerWallet: '0x7c1Ea80e9d343c9613C516BbDa4A7a80323949E6',
    price: 0.5,
    currency: 'ETH',
    timestamp: '2024-09-28T14:22:10Z',
    transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
  },
  {
    id: 'tx-2',
    modelId: 'model-3',
    modelName: 'SoundWave AI',
    buyerWallet: '0xA8902BBb792F169C88957779b53a5506058c4776',
    sellerWallet: '0x9F7A946d935c8Efc7A8329C0d8bD46c7f4F936Bf',
    price: 0.25,
    currency: 'ETH',
    timestamp: '2024-09-27T11:15:43Z',
    transactionHash: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321'
  },
  {
    id: 'tx-3',
    modelId: 'model-6',
    modelName: 'CreativeFlow',
    buyerWallet: '0x5541fc129C5262d01461Ff174c45c0D7f2b1C4ef',
    sellerWallet: '0x6E8ea9E1A5F9d982Ed900fE0A33F5DF3d4C5b1fA',
    price: 0.45,
    currency: 'ETH',
    timestamp: '2024-09-26T16:05:22Z',
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  }
];