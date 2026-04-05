import { useState } from 'react';

interface AuthProps {
  onLogin: (email: string) => void;
}

const AuthPage = ({ onLogin }: AuthProps) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email); // Mock login
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen bg-[#282828] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#f89c20] p-8 text-center text-white">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">ZANDO</h1>
          <p className="text-xs font-bold uppercase tracking-[0.3em] mt-2 opacity-90">
            {isLoginView ? 'Welcome Back' : 'Join the Marketplace'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#f89c20] transition-colors text-sm"
              placeholder="name@unilag.edu.ng"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#f89c20] transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#282828] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg"
          >
            {isLoginView ? 'Login to Shop' : 'Create Account'}
          </button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-[10px] font-bold text-gray-400 uppercase hover:text-[#f89c20] transition-colors"
            >
              {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>

        <div className="p-6 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-[9px] text-gray-400 uppercase leading-relaxed font-medium">
            By continuing, you agree to Zando's <br /> 
            <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;