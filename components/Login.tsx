import { FaEnvelope } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { FaRegEye } from 'react-icons/fa';

const Login = () => {
  const [revealPassword, setRevealPassword] = useState(false);

  return (
    <section
      className="fixed inset-0 flex justify-center items-center"
      style={{
        backgroundImage: 'url("/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-6 rounded-2xl shadow-2xl">
        <img src="/logo.png" alt="Logo" className="w-15 shadow-2xl mx-auto" />

        <h5 className="mt-4 text-2xl font-extrabold text-center">
          Sign in with email
        </h5>

        <p className="mb-6 text-center">
          Login to track traffic and traffic violations
        </p>

        <div className="form-control mb-6">
          <input
            type="text"
            placeholder=""
            className="bg-gray-200 rounded-2xl w-full py-1.5"
          />
          <label>Email</label>
          <FaEnvelope className="absolute top-2 left-3 text-gray-500" />
        </div>

        <div className="form-control">
          <input
            type={revealPassword ? 'text' : 'password'}
            placeholder=""
            className="bg-gray-200 rounded-2xl w-full py-1.5"
          />
          <label>Password</label>
          <RiLockPasswordFill className="absolute top-2 left-3 text-gray-500" />
          {revealPassword ? (
            <FaRegEye
              className="absolute top-2 right-3 text-gray-500"
              onClick={() => setRevealPassword((prev) => !prev)}
            />
          ) : (
            <FaEyeSlash
              className="absolute top-2 right-3 text-gray-500"
              onClick={() => setRevealPassword((prev) => !prev)}
            />
          )}
        </div>
        <p className="mb-6 text-right">Forgot password?</p>

        <button className="hover:bg-[#2582ff]   rounded-2xl w-full bg-blue-950 text-white text-center p-1.5">
          Log in
        </button>
      </div>
    </section>
  );
};

export default Login;
