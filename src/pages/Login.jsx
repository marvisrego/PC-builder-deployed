import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Shield, Fingerprint, Terminal } from 'lucide-react';

export default function Login() {
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate('/builder');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative overflow-hidden">
      {/* Background Cyber-grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl"
      >
        <div className="text-center md:text-left mb-8">
          <motion.div 
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-6 border border-slate-700 shadow-[0_0_30px_rgba(0,240,255,0.15)]"
          >
            <Terminal className="text-electric w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-black text-white mb-2">Initialize Session</h1>
          <p className="text-slate-400">Authenticate to access the Quantum Rigs Builder Engine.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Shield size={18} />
              </div>
              <input 
                type="text" 
                defaultValue="GUEST_ACCESS"
                disabled
                className="w-full bg-slate-800/50 border border-slate-700 text-slate-300 px-4 py-3 pl-12 rounded-xl focus:outline-none cursor-not-allowed opacity-70 font-mono text-sm"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full relative group overflow-hidden bg-electric text-slate-900 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Fingerprint size={18} /> Bypass Security
            </span>
          </motion.button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 font-mono flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Latency: 12ms | Grid: ONLINE
        </div>
      </motion.div>
    </div>
  );
}
