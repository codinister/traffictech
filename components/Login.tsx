import { FaEnvelope } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaEyeSlash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../types/schemaType';
import { z } from 'zod';
import { DotRevolveIcon } from '../components/Loader';
import { logInEndpoint } from '../service/endPoints';
import { useNavigate } from 'react-router-dom';
import { Session } from '../context/SessionContext';

const Login = () => {
  const [revealPassword, setRevealPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  const { loginSession } = Session();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('login')) {
      navigate('/dashboard');
    }
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
  } = form;

  const handleFormSubmit = async (val: z.infer<typeof loginSchema>) => {
    const res = await logInEndpoint({
      url: '/login',
      email: val?.email,
      password: val?.password,
    });

    setIsLogging(isSubmitSuccessful);

    if (!res?.data) {
      setError('Password or Email is incorrect!');

      setTimeout(() => {
        setError('');
        setIsLogging(false);
      }, 2000);
      return;
    }

    loginSession(res?.data);

    navigate('/dashboard');
  };

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

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-control mb-6">
            <input
              {...register('email')}
              type="text"
              name="email"
              placeholder=""
              className="bg-gray-200 rounded-2xl w-full py-1.5"
            />
            <label>Email</label>
            <FaEnvelope className="absolute top-2 left-3 text-gray-500" />
            <p className="text-red-400">{errors.email?.message}</p>
          </div>

          <div className="form-control">
            <input
              {...register('password')}
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
            <p className="text-red-400">{errors.password?.message}</p>
          </div>

          <p className="mb-6 text-right">Forgot password?</p>

          <button
            disabled={isLogging}
            className="hover:bg-[#2582ff]   rounded-2xl w-full bg-blue-950 text-white text-center p-1.5
          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:bg-blue-950
          cursor-pointer
          "
          >
            {error ? (
              error
            ) : isLogging ? (
              <DotRevolveIcon className="mx-auto" />
            ) : (
              'Log in'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
