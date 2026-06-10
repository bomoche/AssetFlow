import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import ROUTES from '../constants/routes';

export default function Login() {
  const navigate              = useNavigate();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const { handleLogin, error, loading } = useLogin(() => navigate(ROUTES.PORTFOLIO));

  function onSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-stack-lg min-h-screen bg-background">

      {/* Brand */}
      <div className="mb-stack-lg flex flex-col items-center">
        <div className="mb-stack-sm text-primary-container p-4 rounded-lg bg-surface-container-high border border-outline-variant">
          <span className="material-symbols-outlined" style={{ fontSize: 36 }}>account_balance</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary-container tracking-tight">AssetFlow</h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Institutional Wealth Management</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-[400px] bg-surface-container-lowest border border-outline-variant p-stack-md rounded-lg shadow-sm">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md">Secure Login</h2>

        {/* Mock credentials hint */}
        <div className="mb-stack-md p-stack-sm bg-surface-container border border-outline-variant rounded-lg">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-stack-xs">DEMO CREDENTIALS</p>
          <p className="font-data-mono text-data-mono text-on-surface">investor@enviro365.co.za</p>
          <p className="font-data-mono text-data-mono text-on-surface">password123</p>
        </div>

        <form className="space-y-stack-md" onSubmit={onSubmit}>

          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-2 p-stack-sm bg-error-container border border-error rounded-lg">
              <span className="material-symbols-outlined text-error text-[18px]">error</span>
              <p className="font-body-sm text-body-sm text-on-error-container">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-stack-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. investor@enviro365.co.za"
              className="w-full h-12 px-stack-sm border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg font-body-md bg-white outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-stack-xs">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">
                Password
              </label>
              <a href="#" className="font-label-caps text-label-caps text-secondary hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 px-stack-sm pr-12 border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg font-body-md bg-white outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">
                  {showPass ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-secondary-container text-on-secondary-container font-headline-md text-headline-md border border-secondary active:scale-95 transition-all flex items-center justify-center gap-2 mt-stack-sm disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
          >
            {loading
              ? <><div className="w-4 h-4 border-2 border-on-secondary-container border-t-transparent rounded-full animate-spin" />Signing in…</>
              : <>Login <span className="material-symbols-outlined">arrow_forward</span></>
            }
          </button>
        </form>

        <div className="flex items-center my-stack-md gap-stack-sm">
          <div className="flex-grow h-px bg-outline-variant" />
          <span className="font-label-caps text-label-caps text-outline">OR</span>
          <div className="flex-grow h-px bg-outline-variant" />
        </div>

        <div className="mt-stack-md text-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Don't have an account?{' '}
            <Link to={ROUTES.SIGNUP} className="text-primary-container font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}