'use client';

import { NAVIGATION } from '@/helpers/constants';
import { Link, useRouter } from '@/navigation';
import { useState } from 'react';
import Input from './common/input';
import { useRegistrationMutation } from '@/redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/slice/authSlice';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [register] = useRegistrationMutation();
  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();

    const data = await register(formData).unwrap();

    if (data) {
      dispatch(setCredentials(data));
      router.push(NAVIGATION.admin);
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
          type="password"
        />

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
}
