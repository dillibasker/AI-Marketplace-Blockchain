import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeDollarSign, BarChart3, ListFilter, Plus, Upload } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { mockTransactions } from '../data/mockData';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { connected, connect, address } = useWallet();
  const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'transactions'>('overview');
  
  if (!connected) {
    return (
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Connect Your Wallet
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Please connect your wallet to access your dashboard and manage your AI models.
              </p>
              <button onClick={connect} className="btn btn-primary">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your AI models, transactions, and analytics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden sticky top-24">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      Your Account
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </div>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                        activeTab === 'overview'
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <BarChart3 className="w-4 h-4 mr-3" />
                      Overview
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('models')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                        activeTab === 'models'
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <ListFilter className="w-4 h-4 mr-3" />
                      My Models
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('transactions')}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                        activeTab === 'transactions'
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <BadgeDollarSign className="w-4 h-4 mr-3" />
                      Transactions
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatedTabContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

interface AnimatedTabContentProps {
  activeTab: 'overview' | 'models' | 'transactions';
}

const AnimatedTabContent: React.FC<AnimatedTabContentProps> = ({ activeTab }) => {
  // Render different content based on active tab
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {activeTab === 'overview' && <OverviewTab />}
      {activeTab === 'models' && <ModelsTab />}
      {activeTab === 'transactions' && <TransactionsTab />}
    </motion.div>
  );
};

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Models Owned
            </h3>
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <ListFilter className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            3
          </div>
          <div className="mt-2 text-sm text-success-600 dark:text-success-500 flex items-center">
            <ArrowRight className="w-4 h-4 mr-1" />
            <span>View all</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
              ETH Spent
            </h3>
            <div className="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
              <BadgeDollarSign className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            1.2 ETH
          </div>
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400 flex items-center">
            <span>Last month: 0.7 ETH</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
              ETH Earned
            </h3>
            <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
              <BadgeDollarSign className="w-5 h-5 text-accent-600 dark:text-accent-400" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            0.45 ETH
          </div>
          <div className="mt-2 text-sm text-success-600 dark:text-success-500 flex items-center">
            <span>+0.15 ETH this month</span>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Recent Activity
          </h3>
        </div>
        <div className="p-6">
          <ul className="space-y-6">
            {mockTransactions.map((tx) => (
              <li key={tx.id} className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <BadgeDollarSign className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {tx.modelName} Purchase
                    </h4>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {tx.price} {tx.currency}
                  </p>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    TX: {tx.transactionHash.slice(0, 10)}...
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ModelsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          My Models
        </h2>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          List New Model
        </button>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Models You Own
          </h3>
          <Link to="/explore" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
            Explore More
          </Link>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden mr-4">
                <img 
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Model" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  ImageCraft Pro
                </h4>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-0.5 rounded">
                    image-generation
                  </span>
                  <span className="mx-2 text-sm text-slate-400">•</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Purchased on Sep 28, 2024
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="btn btn-sm btn-outline">
                Download
              </button>
              <Link to="/model/model-1" className="btn btn-sm btn-primary">
                View
              </Link>
            </div>
          </div>
          
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden mr-4">
                <img 
                  src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Model" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  VisionDetect
                </h4>
                <div className="flex items-center mt-1">
                  <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 px-2 py-0.5 rounded">
                    computer-vision
                  </span>
                  <span className="mx-2 text-sm text-slate-400">•</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Purchased on Sep 15, 2024
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="btn btn-sm btn-outline">
                Download
              </button>
              <Link to="/model/model-5" className="btn btn-sm btn-primary">
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Your Listed Models
          </h3>
        </div>
        <div className="p-10 text-center">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No models listed yet
          </h4>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Start sharing your AI models with the community and earn cryptocurrency.
          </p>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            List Your First Model
          </button>
        </div>
      </div>
    </div>
  );
};

const TransactionsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Transaction History
      </h2>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Recent Transactions
            </h3>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-700/30">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Model
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Transaction
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
              {mockTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {tx.modelName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">
                      {tx.price} {tx.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    <a 
                      href={`https://etherscan.io/tx/${tx.transactionHash}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      {tx.transactionHash.slice(0, 8)}...{tx.transactionHash.slice(-6)}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;