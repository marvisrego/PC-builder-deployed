import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { mockDb } from '../data/mockDb';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, MapPin, PackageCheck } from 'lucide-react';
import Header from '../components/Header';

export default function Checkout() {
  const [complete, setComplete] = useState(false);
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const navigate = useNavigate();

  const cartItems = Object.keys(cart).map(category => {
    const partId = cart[category];
    return mockDb[category]?.find(p => p.id === partId);
  }).filter(Boolean);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    setComplete(true);
    clearCart();
  };

  if (complete) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <Header onCartOpen={() => {}} />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-8 bg-slate-900 border border-slate-800 rounded-3xl max-w-lg shadow-[0_0_40px_rgba(0,240,255,0.1)]"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h2 className="text-3xl font-black text-white mb-4">Payment Successful!</h2>
            <p className="text-slate-400 mb-8">Your hardware is being securely packaged and will be shipped to your coordinates shortly.</p>
            <button 
              onClick={() => navigate('/builder')}
              className="px-8 py-3 bg-electric text-slate-900 rounded-xl font-bold hover:bg-white transition-colors"
            >
              Return to Builder
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header onCartOpen={() => {}} />
      
      <main className="max-w-7xl mx-auto px-6 py-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
            <CreditCard className="text-electric" /> Payment Details
          </h2>
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2 mb-4"><MapPin size={18} /> Shipping Coordinates</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="bg-slate-800 border-none p-3 rounded-lg text-white" />
                <input required type="text" placeholder="Last Name" className="bg-slate-800 border-none p-3 rounded-lg text-white" />
              </div>
              <input required type="text" placeholder="Full Address" className="w-full bg-slate-800 border-none p-3 rounded-lg text-white" />
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2 mb-4"><CreditCard size={18} /> Card Details</h3>
              <input required type="text" placeholder="Card Number (Dummy)" className="w-full bg-slate-800 border-none p-3 rounded-lg text-white" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="MM/YY" className="bg-slate-800 border-none p-3 rounded-lg text-white" />
                <input required type="text" placeholder="CVC" className="bg-slate-800 border-none p-3 rounded-lg text-white" />
              </div>
            </div>

            <button type="submit" disabled={cartItems.length === 0} className="w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed bg-electric text-slate-900 font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <PackageCheck /> Authorize Payment (${total.toFixed(2)})
            </button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 h-fit">
          <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between pb-4 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                  <img src={item.image} className="w-12 h-12 rounded object-cover bg-slate-800" />
                  <div>
                    <div className="text-xs text-electric uppercase font-bold tracking-widest">{item.category}</div>
                    <div className="text-sm font-semibold">{item.name}</div>
                  </div>
                </div>
                <div className="font-bold">${item.price.toFixed(2)}</div>
              </div>
            ))}
            {cartItems.length === 0 && <div className="text-slate-500 italic">No items in cart</div>}
          </div>
          <div className="flex justify-between items-center text-xl font-black">
            <span>Total</span>
            <span className="text-electric">${total.toFixed(2)}</span>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
