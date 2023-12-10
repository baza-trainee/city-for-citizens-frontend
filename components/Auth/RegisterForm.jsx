'use client';

import { NAVIGATION } from '@/helpers/constants';
import { Link, useRouter } from '@/navigation';
import { register } from '@/services/authAPI';
import { useState } from 'react';
import { publicRoute } from '../publicRoute';

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

    const { accessToken } = await register(formData);

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      router.push(NAVIGATION.admin);
    }

    try {
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
        className="flex flex-col items-center gap-[30px]"
      >
        <label>
          <span>Name</span>
          <input value={name} onChange={handleChange} name="name" type="text" />
        </label>
        <label>
          <span>Email</span>
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="text"
          />
        </label>
        <label>
          <span>Password</span>
          <input
            password={password}
            onChange={handleChange}
            name="password"
            type="text"
          />
        </label>

        {error && <p>{error}</p>}

        <p>
          Already have an account?{' '}
          <Link href="/login">
            <u>Log in.</u>
          </Link>
        </p>
        <button className="mx-auto my-0 block rounded-[10px] bg-primary/80 px-[40px] py-[10px]">
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
