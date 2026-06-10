import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '../hooks/useAuth';
import ROUTES from '../constants/routes';

export default function SignUp() {
  const navigate                          = useNavigate();
  const [fullName,         setFullName]         = useState('');
  const [email,            setEmail]            = useState('');
  const [password,         setPassword]         = useState('');
  const [confirmPassword,  setConfirmPassword]  = useState('');
  const [agreedToTerms,    setAgreedToTerms]    = useState(false);

  const { handleSignUp, error, loading } = useSignUp(() => navigate(ROUTES.PORTFOLIO));

  function onSubmit(e) {
    e.preventDefault();
    if (!agreedToTerms) return;
    handleSignUp(fullName, email, password, confirmPassword);
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-stack-lg min-h-screen bg-background">

      <div className="w-full max-w-[400px] flex flex-col gap-stack-md">

        {/* Brand */}
        <header className="flex flex-col items-center text-center gap-stack-xs">
          <div className="flex items-center justify-center w-12 h-12 bg-primary-container rounded-lg mb-stack-xs">
            <span className="material-symbols-outlined text-on-primary" style={{ fontSize: 32 }}>account_balance</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">AssetFlow</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Secure institutional wealth management</p>
        </header>

        {/* Card */}
        <div className="bg-surface-container-lowest border border-outline-variant p-stack-md rounded-lg">
          <div className="mb-stack-md">
            <h2 className="font-headline-md text-headline-md text-primary">Create Account</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Join our private investment network.</p>
          </div>

          <form className="flex flex-col gap-stack-sm" onSubmit={onSubmit}>

            {error && (
              <div className="flex items-center gap-2 p-stack-sm bg-error-container border border-error rounded-lg">
                <span className="material-symbols-outlined text-error text-[18px]">error</span>
                <p className="font-body-sm text-body-sm text-on-error-container">{error}</p>
              </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col gap-stack-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="full_name">Full Name</label>
              <input
                id="full_name"
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Jonathan Doe"
                className="w-full border border-outline p-stack-sm rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-stack-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@institution.com"
                className="w-full border border-outline p-stack-sm rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-stack-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-outline p-stack-sm rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-stack-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-outline p-stack-sm rounded-lg font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-stack-xs py-stack-xs">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 border-outline rounded text-primary"
              />
              <label htmlFor="terms" className="font-body-sm text-body-sm text-on-surface-variant">
                I agree to the{' '}
                <a href="#" className="text-secondary font-semibold hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-secondary font-semibold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-secondary-container text-on-secondary-container font-headline-md text-headline-md py-stack-sm rounded-lg hover:bg-secondary-fixed transition-colors active:scale-[0.98] mt-stack-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? <div className="w-4 h-4 border-2 border-on-secondary-container border-t-transparent rounded-full animate-spin mx-auto" />
                : 'Create Account'
              }
            </button>
          </form>

          <div className="mt-stack-md text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="text-primary font-bold hover:underline">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}