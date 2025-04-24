import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, Copy, Edit, ExternalLink, LogOut, Shield, Wallet
} from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { addNotification } from '../components/common/GlobalNotification';

const ProfilePage: React.FC = () => {
  const { connected, connect, disconnect, address, balance } = useWallet();

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
                Please connect your wallet to view your profile.
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addNotification('success', 'Address copied to clipboard!');
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Your Profile
                  </h1>
                  <p className="text-white/80">
                    Manage your account and wallet settings
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={disconnect}
                    className="btn border border-white/30 text-white hover:bg-white/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 sm:p-10">
              {/* Wallet Info */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                  <Wallet className="w-5 h-5 mr-2" />
                  Wallet Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Wallet Address
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-slate-900 dark:text-white font-mono">
                        {address}
                      </div>
                      <button
                        onClick={() => copyToClipboard(address || '')}
                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Balance
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-slate-900 dark:text-white font-bold">
                        {balance} ETH
                      </div>
                      <a 
                        href={`https://etherscan.io/address/${address}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Settings */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                  <Edit className="w-5 h-5 mr-2" />
                  Profile Settings
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Display Name
                    </label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="Enter your display name"
                      defaultValue="AI Enthusiast"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email (optional)
                    </label>
                    <input 
                      type="email" 
                      className="input" 
                      placeholder="Enter your email"
                    />
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      We'll only use this for notifications about your purchases.
                    </p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Bio (optional)
                    </label>
                    <textarea 
                      className="input min-h-[100px]" 
                      placeholder="Tell others about yourself"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
              
              {/* Security */}
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="btn btn-sm btn-outline">
                      Enable
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        Transaction Notifications
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get notified about your marketplace activity
                      </p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional resources */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="#" 
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Documentation</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Learn how to use NexusAI</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400" />
            </a>
            
            <a 
              href="#" 
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Get Help</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Contact our support team</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400" />
            </a>
            
            <a 
              href="#" 
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <h3 className="font-medium text-slate-900 dark:text-white">Community</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Join our Discord server</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;