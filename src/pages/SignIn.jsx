import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiEye, HiEyeOff, HiOutlineShoppingBag } from 'react-icons/hi';
import Button from '../components/Button';
import MiniSpinner from '../components/MiniSpinner';

const SignIn = () => {
  const {isLoading, signin} = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState ({
    username: "",
    password: ""
  })

  function handleChange (e) {
    const { name, value } = e.target;

    setFormData(prevdata => ({
        ...prevdata,
      [name]:value
   }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formData.username === '' || formData.password === ''){
        toast.error('Please fill in all fields')
        return;
    }
    console.log(formData)
    signin(formData)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-n-7 py-4 px-4 sm:px-6 lg:px-8">
      <div
        
        className="max-w-md w-full space-y-4 bg-n-8 p-10 rounded-xl shadow-md"
      >
        <div>
          <div className="flex justify-center">
            <HiOutlineShoppingBag className="h-12 w-12 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-50">
            Or{' '}
            
            <Link to="/signup" className="font-medium text-[#FFF94F] hover:text-yellow-300">
              Create a new account
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">
                Username <span className="text-red-500 text-sm">*</span>
            </label>
            <input 
              type="text" 
              name="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-white focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all"
              placeholder="username"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-base font-medium text-gray-300 mb-1">
                Password <span className="text-red-500 text-sm">*</span>
            </label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-yellow-300x focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all pr-12"
              placeholder="••••••••"
              name="password"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[39px] text-gray-400 hover:text-white transition"
            >
              {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-[#FFF94F] focus:ring-[#FFF94F]" />
              <span className="ml-2 text-base text-gray-200">Remember me</span>
            </label>
            <a href="#" className="text-base text-[#FFF94F] hover:text-yellow-300">Forgot password?</a>
          </div>

          <Button className="w-full">
            {isLoading ? <MiniSpinner /> : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;