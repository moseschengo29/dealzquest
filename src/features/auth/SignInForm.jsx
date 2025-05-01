import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import MiniSpinner from '../../components/MiniSpinner';
import { getTokensInCookies } from './authCookies';
import toast from 'react-hot-toast';

function SignInForm({username, password, setUsername, setPassword, setShowForgotPassword}) {
    const baseUrl = import.meta.env.VITE_API_URL;
    const {accessToken, refreshToken} = getTokensInCookies()
    const {loginUser, isLoading, userName, user, signin} = useAuth();
    const usernameRef = useRef();
    const errRef = useRef();
  
    const [errMsg, setErrMsg] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState("other"); 
    const [role, setRole] = useState("Father"); 
    const [isChanging, setIsChanging] = useState(false)

    useEffect(() => {
        if (usernameRef.current) {
        usernameRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    function handlePasswordView(){
        setPasswordVisible(vis => !vis);
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        if (!username || !password) return;

        const formData = {
            username: username,
            password: password
        }

        signin(formData);
    }

    async function changeOtpRecepient(adm_number, role='Mother') {
        try {
        setIsChanging(true);
        const response = await fetch(
            `${baseUrl}/api/v1/users/notify/${adm_number}/${role}/`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            }
        );

        const resultData = await response.json();

        if (response.status === 200) {
            // toast.success(${role} will recerive the OTP code);
        } else {
            // toast.error('Something went wrong. Make sure the admission number is correct');
        }
        } catch (error) {
        console.error('Error:', error);
        // toast.error('An error occurred while submitting the form');
        } finally {
        setIsChanging(false);
        }
    }

    useEffect(() => {
        if (username !== '' && role !== '' && username.length > 3) {
            changeOtpRecepient(username, role);
        }
    }, [role]);

    function handleUsername(e) {
      setUsername(e.target.value.toLowerCase());  // Converts input to lowercase automatically
  }
  
    const handlePasswordInput = (e) => setPassword(e.target.value);
    
    function handleChangeRole(e){
        setRole(e.target.value)
    }

    function handleSelectedRole(e){
        setSelectedRole(e.target.value)
    }

    return (
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              
              {/* Logo Section */}
              <div className="mb-8 flex justify-center -mt-0 lg:-mt-12">
                <img src="https://eduanalytics.co.ke/logg.png" alt="EduAnalytics Logo" className="w-28 h-20" />
              </div>

              <span className="mb-1.5 block font-medium">Sign in to go to your dashboard.</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In
              </h2>

              <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      ref={usernameRef}
                      name="username"
                      id="username"
                      placeholder="Enter your username"
                      className="w-full rounded-lg border lowercase border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={handleUsername} // Apply lowercase conversion here
                      required
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Atleast 6 characters"
                      name="password"
                      id="password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={handlePasswordInput}
                      required
                    />
                    <span className="absolute right-4 top-4">
                      <button
                        type="button"
                        onClick={handlePasswordView}
                        className="absolute right-0 flex items-center cursor-pointer"
                      >
                        {passwordVisible ? <FaRegEyeSlash size={22} /> : <FaRegEye size={22} />}
                      </button>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Role
                  </label>
                  <div className="flex gap-4">
                    <div>
                      <input
                        type="radio"
                        id="other"
                        name="role"
                        value="other"
                        checked={selectedRole === "other"}
                        onChange={handleSelectedRole}
                      />
                      <label htmlFor="other" className="ml-2">Other</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="student"
                        name="role"
                        value="student"
                        checked={selectedRole === "student"}
                        onChange={handleSelectedRole}
                      />
                      <label htmlFor="student" className="ml-2">Student</label>
                    </div>
                  </div>
                </div>

                {selectedRole === "student" && (
                  <div className="mb-6">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Who is receiving the code?
                    </label>
                    {username.trim() === "" ? (
                      <div className="text-danger bg-danger/5 px-2 py-4 my-3">You have to input admission number first</div>
                    ) : (
                      <select
                        className="w-full rounded-lg disabled:bg-[#f3f3f3] disabled:cursor-not-allowed disabled:dark:bg-black border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        id="role"
                        name="role"
                        required
                        disabled={isChanging}
                        onChange={handleChangeRole}
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                      </select>
                    )}
                  </div>
                )}

                <div className="mb-5">
                  <button disabled={isLoading || isChanging} className='w-full disabled:bg-primary/70 disabled:cursor-not-allowed cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90'>
                    {isLoading ? <MiniSpinner /> : "Sign in"}      
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    <div onClick={() => setShowForgotPassword(true)} className="text-primary cursor-pointer hover:underline">
                      Forgot Password ?
                    </div>
                  </p>
                </div>
              </form>
            </div>
        </div>
    );
}

export default SignInForm;