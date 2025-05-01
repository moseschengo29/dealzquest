import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { CiMail } from 'react-icons/ci';
import { FiUser } from 'react-icons/fi';
import { BsKey } from 'react-icons/bs';
import Button from '../components/Button';
import MiniSpinner from '../components/MiniSpinner';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FaEye } from 'react-icons/fa';
import { IoEyeOffSharp } from 'react-icons/io5';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const { register, isRegistering } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    

    const formData = {
      username: username,
      email: email,
      password: password
    }

    console.log(formData)
    
    try {
      register(formData);
    } catch (error) {
      throw new Error(error)
    } 
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-n-7 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-md w-full space-y-8 bg-n-8 p-10 rounded-xl shadow-md"
      >
        <div>
          <div className="flex justify-center">
            <HiOutlineShoppingBag className="h-12 w-12 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{' '}
            <Link to="/signin" className="font-medium text-[#FFF94F] hover:text-yellow-3000">
              sign in to an existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 text-sm"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block mb-4 w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 text-sm"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsKey className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block mb-4 w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-sm text-yellow-300"
              >
                {showPassword ? <FaEye size={24} /> : <IoEyeOffSharp size={24} />}
              </button>
            </div>
          </div>

          <div className="mb-4 relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsKey className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 text-sm"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-sm text-yellow-300"
              >
                {showConfirmPassword ? <FaEye size={24} /> : <IoEyeOffSharp size={24} />}
                </button>
            </div>
          </div>


          </div>

            <Button className='w-full'>
              {isRegistering ? <MiniSpinner/> : 'Create a new account'}
            </Button>

          <div className="text-sm text-center">
            <p className="text-gray-600">
              By signing up, you agree to our{' '}
              <a href="#" className="font-medium text-[#FFF94F] hover:text-yellow-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-[#FFF94F] hover:text-yellow-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;