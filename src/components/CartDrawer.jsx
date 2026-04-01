import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { mockDb } from '../data/mockDb';
import { X, Cpu, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose }) {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  
  const cartItems = Object.keys(cart).map(category => {
    const partId = cart[category];
    return mockDb[category]?.find(p => p.id === partId);
  }).filter(Boolean);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  // Dynamic Compatibility Check
  const hasMobo = cartItems.find(i => i.category === 'motherboard');
  const hasCpu = cartItems.find(i => i.category === 'cpu');
  const isCompatible = hasMobo && hasCpu ? hasMobo.socket === hasCpu.socket : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40" 
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-800">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="text-electric" /> Current Build
              </h2>
              <button onClick={onClose} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-slate-500 mt-10">
                  <Cpu size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your rig is currently empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id} 
                    className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg border border-slate-700"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-md bg-slate-900/50 border border-slate-700" />
                    <div className="flex-1">
                      <div className="text-xs text-electric uppercase font-bold tracking-widest">{item.category}</div>
                      <div className="text-sm font-semibold text-slate-200">{item.name}</div>
                      <div className="text-sm text-slate-400">${item.price.toFixed(2)}</div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.category)}
                      className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-900 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
              {isCompatible !== null && (
                <div className={`mb-4 px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-semibold border ${isCompatible ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${isCompatible ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-red-400 shadow-[0_0_10px_#f87171]'}`} />
                  {isCompatible ? "Parts Compatible: Socket Match" : "Warning: CPU/Motherboard Socket Mismatch"}
                </div>
              )}
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-400 text-lg">Estimated Total</span>
                <span className="text-3xl font-black text-electric">${total.toFixed(2)}</span>
              </div>
              
              <button onClick={() => { onClose(); window.location.href = '/checkout'; }} disabled={cartItems.length === 0} className="w-full py-4 bg-electric disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]">
                Checkout Build
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
