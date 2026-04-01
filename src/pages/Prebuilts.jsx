import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockDb } from '../data/mockDb';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import Header from '../components/Header';

export default function Prebuilts() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const prebuilts = mockDb['prebuilts'] || [];

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
    <div className="min-h-screen bg-slate-950">
      <Header onCartOpen={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Complete Systems</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Expertly curated setups optimized for absolute maximum performance. Ready to plug in and globally dominate your matches right out of the box.</p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {prebuilts.map((p) => (
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
