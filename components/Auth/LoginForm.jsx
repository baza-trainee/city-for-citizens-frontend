'use client';
import { Link, useRouter } from '@/navigation';
import { login } from '@/services/authAPI';
import { useState } from 'react';

import { publicRoute } from '@/components/publicRoute';

import { NAVIGATION } from '@/helpers/constants';

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
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[30px]"
        >
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
            {"Don't have an account yet?"}
            <Link href="/register">
              <u>Sign up.</u>
            </Link>
          </p>
          <button className="mx-auto my-0 block rounded-[10px] bg-primary/80 px-[40px] py-[10px]">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default publicRoute({
  component: LoginForm,
  redirectTo: NAVIGATION.admin,
});
