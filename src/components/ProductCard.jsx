import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { ShoppingCart, Check, Heart } from 'lucide-react';
import clsx from 'clsx';

export default function ProductCard({ product }) {
  const { cart, addToCart, wishlist, toggleWishlist } = useStore();
  
  const isSelected = cart[product.category] === product.id;
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 1, rotateX: -1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={clsx(
        "relative flex flex-col p-4 rounded-xl border bg-slate-800/50 backdrop-blur-sm cursor-pointer transition-colors duration-300",
        isSelected ? "border-electric/50 bg-electric/5" : "border-slate-700 hover:border-slate-600"
      )}
      onClick={() => addToCart(product.category, product.id)}
    >
      {isSelected && (
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-electric/30 to-blue-600/30 opacity-50 blur-sm -z-10" />
      )}
      
      <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden bg-slate-900/50 flex items-center justify-center group border border-transparent hover:border-slate-700/50 transition-colors">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain w-full h-full p-2 transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <Heart size={16} className={clsx(isWishlisted && "fill-red-500 text-red-500")} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-1">
          {product.category}
        </div>
        <h3 className="text-lg font-bold text-slate-100 leading-tight mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-slate-400 flex-1 line-clamp-2">
          {product.desc}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-black text-electric">
            ${product.price.toFixed(2)}
          </span>
          <button 
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              isSelected ? "bg-electric text-slate-900" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            )}
          >
            {isSelected ? <Check size={16} strokeWidth={3} /> : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
