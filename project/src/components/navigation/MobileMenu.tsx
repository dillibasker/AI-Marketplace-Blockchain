import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, X } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { connected, connect, address } = useWallet();

  // Animation variants
  const menuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-slate-900 shadow-xl z-50 overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-4 flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="px-4 py-6">
              <nav className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Navigation
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/" className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400" onClick={onClose}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/explore" className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400" onClick={onClose}>
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard" className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400" onClick={onClose}>
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Resources
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400" onClick={onClose}>
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400" onClick={onClose}>
                        API Reference
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400" onClick={onClose}>
                        Community
                      </a>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div variants={itemVariants} className="pt-6">
                  {connected ? (
                    <Link to="/profile" className="w-full btn btn-outline" onClick={onClose}>
                      <Wallet className="w-4 h-4 mr-2" />
                      <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                    </Link>
                  ) : (
                    <button onClick={() => { connect(); onClose(); }} className="w-full btn btn-primary">
                      <Wallet className="w-4 h-4 mr-2" />
                      <span>Connect Wallet</span>
                    </button>
                  )}
                </motion.div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;