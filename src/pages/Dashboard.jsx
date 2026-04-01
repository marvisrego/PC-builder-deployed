import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockDb } from '../data/mockDb';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import Header from '../components/Header';

const categories = ['cpu', 'gpu', 'motherboard', 'ram', 'case'];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('cpu');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const parts = mockDb[activeTab] || [];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header onCartOpen={() => setIsCartOpen(true)} />

      <main className="max-w-7xl w-full mx-auto px-6 py-12 flex-1 relative">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === cat 
                  ? 'bg-electric text-slate-900 shadow-[0_0_20px_rgba(0,240,255,0.3)] border-electric' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          key={activeTab}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {parts.map((p) => (
            <motion.div key={p.id} variants={item}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
