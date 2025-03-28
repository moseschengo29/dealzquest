/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { HiX, HiEye, HiEyeOff } from "react-icons/hi";
import Button from "./Button";

function SigninModal({ close, showSignUp }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState ({
    email: "",
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
    if(formData.email === '' || formData.password === ''){
        alert('Please fill in all fields')
        return;
    }
    console.log(formData)
  }

  return (
    <div className="h-screen bg-black/10 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full h-[500px] bg-gray-800/20 border border-yellow-200 shadow-lg rounded-lg p-8 backdrop-blur-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>
          <button
            onClick={close}
            className="text-yellow-300 transition duration-200"
          >
            <HiX className="w-6 h-6 text-yellow-300 hover:text-gray-50 absolute right-4 top-4" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">
                Email <span className="text-red-500 text-sm">*</span>
            </label>
            <input 
              type="email" 
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-white focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all"
              placeholder="your@email.com"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label className="block text-base font-medium text-gray-300 mb-1">
                Password <span className="text-red-500 text-sm">*</span>
            </label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-white focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all pr-12"
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

          <Button className="w-full">Sign in</Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button onClick={showSignUp} className="text-[#FFF94F] hover:text-yellow-300 font-medium">Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default SigninModal;
