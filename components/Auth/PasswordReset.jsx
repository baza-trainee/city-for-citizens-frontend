'use client';
import { useState } from 'react';
import { publicRoute } from '../publicRoute';
import { NAVIGATION } from '@/helpers/constants';

const PasswordReset = ({ token }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      try {
        // Відправте новий пароль і токен на сервер для скидання паролю
        const response = await fetch('/api/passwordReset/reset', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPassword,
            token,
          }),
        });

        const result = await response.json();

        if (result.success) {
          setResetStatus('Password reset successful!');
        } else {
          setResetStatus('Password reset failed. Please try again.');
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        setResetStatus('An error occurred. Please try again later.');
      }
    } else {
      setResetStatus('Passwords do not match. Please check and try again.');
    }
  };

  return (
    <div>
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {resetStatus && <p>{resetStatus}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // Поверніть токен як параметр для сторінки
  return {
    props: {
      token: params.token,
    },
  };
}

export default publicRoute({
  component: PasswordReset,
  redirectTo: NAVIGATION.admin,
});
