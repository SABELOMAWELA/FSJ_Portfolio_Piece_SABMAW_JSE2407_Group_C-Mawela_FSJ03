'use client';
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../api/firebase';
import { useRouter } from 'next/navigation';

/**
 * SignIn component allows users to log in to their accounts.
 * It utilizes Firebase authentication to handle sign-in requests.
 * 
 * @returns {JSX.Element} The SignIn form.
 */
const SignIn = () => {
  const [email, setEmail] = useState(''); // State to store email input
  const [password, setPassword] = useState(''); // State to store password input
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth); // Firebase hook for signing in
  const router = useRouter(); // Hook for navigating between pages

  /**
   * Handles the sign-in process when the user submits the form.
   * It calls the Firebase sign-in function and manages session storage.
   */
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        console.log({ res });
        sessionStorage.setItem('user', true); // Store user session in session storage
        setEmail(''); // Reset email input
        setPassword(''); // Reset password input
        router.push('/'); // Redirect to the home page after successful sign-in
      }
    } catch (e) {
      console.error(e); // Log error if sign-in fails
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen flex items-center justify-center p-4">
      <div className="grid md:grid-cols-3 items-center shadow-lg rounded-xl overflow-hidden max-w-4xl w-full">
        <form className="md:col-span-2 w-full py-6 px-6 sm:px-16 bg-white">
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Sign In</h3>
            <p className="text-gray-800 text-sm mt-3 leading-relaxed">
              Welcome back! Please log in to access your account and explore a world of possibilities. Your journey begins here.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-4 h-4 absolute right-4 top-10"
                viewBox="0 0 682.667 682.667"
              >
                <defs>
                  <clipPath id="a" clipPathUnits="userSpaceOnUse">
                    <path d="M0 512h512V0H0Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="40"
                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                  />
                  <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
                </g>
              </svg>
            </div>

            <div className="relative">
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-4 h-4 absolute right-4 top-10 cursor-pointer"
                viewBox="0 0 128 128"
              >
                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
              </svg>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-800">
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="text-blue-600 font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="button"
              onClick={handleSignIn}
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <p className="text-sm text-gray-800 mt-8 text-center">
            Don't have an account?{' '}
            <a href="/sign-up" className="text-blue-600 font-semibold hover:underline">
              Register here
            </a>
          </p>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {error.message}
            </p>
          )}
        </form>

        <div className="flex flex-col justify-center space-y-8 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Secure Authentication</h4>
            <p className="text-sm text-gray-300 mt-2">
              Log in with your registered email and password securely.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Remember Me</h4>
            <p className="text-sm text-gray-300 mt-2">
              Enable the "Remember Me" option for a seamless login experience in future sessions.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Forgot Password?</h4>
            <p className="text-sm text-gray-300 mt-2">
              Easily recover your account by clicking on the "Forgot Password?" link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
