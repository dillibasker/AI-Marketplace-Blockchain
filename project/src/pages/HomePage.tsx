import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { useMarketplace } from '../contexts/MarketplaceContext';
import ModelCard from '../components/marketplace/ModelCard';

const HomePage: React.FC = () => {
  const { featuredModels, categories } = useMarketplace();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwMCIgaGVpZ2h0PSIyMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxwYXRoIGQ9Ik0gLTEwLDEwIGwgMjAsLTIwIE0gMCwyMCBsIDIwLC0yMCBNIDEwLDMwIGwgMjAsLTIwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIgLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                The Decentralized Marketplace for <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-accent-400">AI Models</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Buy, sell, and trade AI models securely using blockchain technology. NexusAI connects creators with users in a transparent ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/explore" className="btn btn-secondary">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/dashboard" className="btn btn-outline text-white border-white/30 hover:bg-white/10">
                  List Your Model
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16 relative"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden shadow-xl">
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-secondary-900/50 to-primary-900/50 rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BrainCircuit className="w-24 h-24 text-white/30 animate-pulse-slow" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                    <span className="text-sm text-white/80">1,257 Models Available</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    Blockchain Secured
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-accent-500 rounded-full p-4 shadow-lg animate-float">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-secondary-500 rounded-full p-3 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <Zap className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose NexusAI Marketplace?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform combines the power of AI with the security of blockchain technology to create a transparent and efficient marketplace.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="card p-8">
              <div className="bg-primary-100 dark:bg-primary-900/40 p-3 rounded-lg inline-block mb-4">
                <ShieldCheck className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Secure Ownership</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Smart contracts ensure verifiable ownership of AI models with transparent transaction history on the blockchain.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="card p-8">
              <div className="bg-secondary-100 dark:bg-secondary-900/40 p-3 rounded-lg inline-block mb-4">
                <Zap className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Instant Access</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Purchase and immediately use AI models without intermediaries. Direct creator-to-user transactions.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="card p-8">
              <div className="bg-accent-100 dark:bg-accent-900/40 p-3 rounded-lg inline-block mb-4">
                <Sparkles className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Creator Royalties</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Creators earn ongoing royalties from their innovations through smart contracts, ensuring fair compensation.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Models Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row justify-between items-center mb-12"
          >
            <div>
              <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Featured AI Models
              </motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400">
                Discover top-rated models from our marketplace
              </motion.p>
            </div>
            <motion.div variants={itemVariants}>
              <Link to="/explore" className="mt-4 md:mt-0 btn btn-outline">
                View All Models
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredModels.map((model) => (
              <motion.div key={model.id} variants={itemVariants}>
                <ModelCard model={model} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Browse Categories
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Find the perfect AI model for your specific needs
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link to={`/explore?category=${category.id}`} className="block glass-card p-6 text-center transition-all hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:scale-105">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {category.count} models
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Ready to join the future of AI commerce?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg mb-8 text-white/80">
              Create an account, connect your wallet, and start buying or selling AI models today.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/explore" className="btn bg-white text-primary-700 hover:bg-white/90">
                Start Exploring
              </Link>
              <Link to="/dashboard" className="btn border-white text-white hover:bg-white/20">
                Share Your Model
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;