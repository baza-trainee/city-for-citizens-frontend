'use client';
import { Link, useRouter } from '@/navigation';
import { login } from '@/services/authAPI';
import { useState } from 'react';

import { publicRoute } from '@/components/publicRoute';

import { NAVIGATION } from '@/helpers/constants';

import Input from './Input';

const inputStyle =
  'mt-1 w-full cursor-pointer text-ellipsis rounded-lg border border-gray/20 bg-gray/5 p-2.5 placeholder-gray/30 hover:border-primary/100 focus:outline-gray/100';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await login(formData);

      const { accessToken } = res;
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        router.push(NAVIGATION.admin);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const { email, password } = formData;
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-[394px] flex-col items-center gap-[30px]"
      >
        <Input
          label="Email"
          value={email}
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Enter email"
        />
        <Input
          label="Password"
          value={password}
          onChange={handleChange}
          name="password"
          type="text"
          placeholder="Enter password"
        />

        {error && <p>{error}</p>}
        <p>
          {"Don't have an account yet?"}
          <Link className="ml-2 hover:text-gray/30" href="/register">
            <u>Sign up.</u>
          </Link>
        </p>
        <button className="mx-auto my-0 block w-full rounded-lg bg-primary/100 p-2.5 px-[40px] py-[10px] text-gray/0 hover:bg-primary/80 dark:border-gray/5 dark:bg-gray/5 dark:text-gray/100 dark:hover:border-gray/10 dark:hover:bg-gray/10">
          Login
        </button>
      </form>
    </div>
  );
};
export default publicRoute({
  component: LoginForm,
  redirectTo: NAVIGATION.admin,
});
