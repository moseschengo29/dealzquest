/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { HiX, HiEye, HiEyeOff } from "react-icons/hi";
import Button from "./Button";
import toast from "react-hot-toast";

function SignupModal({ close, showLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset password error if user starts typing
    if (name === "password" || name === "confirm_password") {

      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: "",
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (formData.email === '' || formData.password === '' || formData.phone_number === '' || formData.first_name === '' || formData.last_name === '') {
        toast.error('Please input all fields')
      newErrors.emptyFields = "Please fill in all fields";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.passwordMatch = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted successfully:", formData);
  };

  return (
    <div className="h-screen bg-black/10 flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full h-[700px] bg-gray-800/20 border border-yellow-200 shadow-lg rounded-lg p-8 backdrop-blur-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Register Account
          </h2>
          <button onClick={close} className="text-yellow-300 transition duration-200">
            <HiX className="w-6 h-6 text-yellow-300 hover:text-gray-50 absolute right-4 top-4" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div>
              <label className="block text-base font-medium text-gray-300 mb-1">
                First Name <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-[#FFF94F] focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all"
                placeholder="John"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-300 mb-1">
                Last Name <span className="text-red-500 text-sm">*</span>
              </label>
              <input
                type="text"
                name="last_name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-[#FFF94F] focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all"
                placeholder="Doe"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">
              Email <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-[#FFF94F] focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all"
              placeholder="your@email.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">
              Phone Number <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type="text"
              name="phone_number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent text-[#FFF94F] focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all"
              placeholder="07xxxxxxxx"
              onChange={handleChange}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-base font-medium text-gray-300 mb-1">
              Password <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={`w-full px-4 py-3 border ${
                errors.passwordMatch ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-transparent text-[#FFF94F] focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all pr-12`}
              placeholder="••••••••"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[39px] text-gray-400 hover:text-[#FFF94F] transition"
            >
              {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="block text-base font-medium text-gray-300 mb-1">
              Confirm Password <span className="text-red-500 text-sm">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              className={`w-full px-4 py-3 border ${
                errors.passwordMatch ? "border-red-500" : "border-gray-300"
              } rounded-lg bg-transparent text-[#FFF94F] focus:ring-1 focus:ring-[#FFF94F] focus:border-[#FFF94F] outline-none transition-all pr-12`}
              placeholder="••••••••"
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-[39px] text-gray-400 hover:text-[#FFF94F] transition"
            >
              {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>

          {/* Error Message */}
          {errors.passwordMatch && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordMatch}</p>
          )}

          <Button className="w-full">Sign Up</Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button onClick={showLogin} className="text-[#FFF94F] hover:text-yellow-300 font-medium">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;
