import { useStore } from '../store/useStore';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, LogOut, TerminalSquare, PackageSearch } from 'lucide-react';
import clsx from 'clsx';

export default function Header({ onCartOpen }) {
  const logout = useStore((state) => state.logout);
  const cart = useStore((state) => state.cart);
  const cartItemsCount = Object.keys(cart).length;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/builder" className="flex items-center gap-3">
            <TerminalSquare className="text-electric w-8 h-8" />
            <h1 className="text-2xl font-black tracking-tight hidden sm:block"><span className="text-electric">QUANTUM</span> RIGS</h1>
          </Link>
          
          <nav className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
            <Link 
              to="/builder" 
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                location.pathname === '/builder' ? "bg-electric text-slate-900" : "text-slate-400 hover:text-white hover:bg-slate-700"
              )}
            >
              Custom
            </Link>
            <Link 
              to="/prebuilts" 
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
                location.pathname === '/prebuilts' ? "bg-electric text-slate-900" : "text-slate-400 hover:text-white hover:bg-slate-700"
              )}
            >
              <PackageSearch size={16} /> Pre-Builts
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onCartOpen}
            className="relative p-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors border border-slate-700 hover:border-slate-500"
          >
            <ShoppingBag size={20} className="text-slate-300" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-electric text-slate-900 text-xs font-black min-w-5 h-5 flex items-center justify-center rounded-full pointer-events-none">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button 
            onClick={handleLogout}
            className="hidden sm:block p-3 text-slate-400 hover:text-red-400 transition-colors bg-slate-800/50 hover:bg-slate-800 rounded-full"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
