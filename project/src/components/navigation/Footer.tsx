import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <BrainCircuit className="w-7 h-7 text-primary-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-500">
                NexusAI
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The decentralized marketplace for AI models, powered by blockchain technology.
              Buy, sell, and trade with security and transparency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Products</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  SDK & Tools
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  API Access
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Model Training
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} NexusAI. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-xs text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;