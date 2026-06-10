import { useState } from 'react';
import { BASE_URL } from '../api/investorApi';

export function useLogin(onSuccess) {
  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(email, password) {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid email or password.');
        return;
      }

      // Store token and investor ID for all subsequent requests
      localStorage.setItem('token', data.token);
      localStorage.setItem('investorId', data.investorId);
      localStorage.setItem('isAuthenticated', 'true');

      onSuccess();
    } catch {
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, error, loading };
}

export function useSignUp(onSuccess) {
  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignUp(fullName, email, password, confirmPassword) {
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      // Split full name into first and last
      const parts     = fullName.trim().split(' ');
      const firstName = parts[0];
      const lastName  = parts.slice(1).join(' ') || parts[0];

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          dateOfBirth: '1990-01-01', // default — update when profile editing is added
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed.');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('investorId', data.investorId);
      localStorage.setItem('isAuthenticated', 'true');

      onSuccess();
    } catch {
      setError('Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return { handleSignUp, error, loading };
}

export function useLogout(onSuccess) {
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('investorId');
    localStorage.removeItem('isAuthenticated');
    onSuccess();
  }
  return { handleLogout };
}

export function isAuthenticated() {
  return localStorage.getItem('isAuthenticated') === 'true';
}