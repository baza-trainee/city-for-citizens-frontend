'use client';

import { NAVIGATION } from '@/helpers/constants';
import { Link, useRouter } from '@/navigation';
import { register } from '@/services/authAPI';
import { useState } from 'react';
import { publicRoute } from '../publicRoute';
import Input from './Input';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      const { accessToken } = await register(formData);

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        router.push(NAVIGATION.admin);
      }
    } catch (error) {
      setError(error.message);
      console.log('error:', error.message);
    }
  };

  const { name, email, password } = formData;
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-[394px] flex-col items-center gap-[30px] py-4"
      >
        <Input
          label="Name"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
          name="name"
          type="text"
        />
        <Input
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
          name="email"
          type="text"
        />
        <Input
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
          name="password"
          type="text"
        />

        {error && <p>{error}</p>}

        <p>
          Already have an account?{' '}
          <Link className="ml-2 hover:text-gray/30" href="/login">
            <u>Log in.</u>
          </Link>
        </p>
        <button className="mx-auto my-0 block w-full rounded-lg bg-primary/100 p-2.5 px-[40px] py-[10px] text-gray/0 hover:bg-primary/80 dark:border-gray/5 dark:bg-gray/5 dark:text-gray/100 dark:hover:border-gray/10 dark:hover:bg-gray/10">
          Sing Up
        </button>
      </form>
    </div>
  );
};
export default publicRoute({
  component: RegisterForm,
  redirectTo: NAVIGATION.admin,
});
