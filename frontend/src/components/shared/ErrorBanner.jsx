import React from 'react';

export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="mb-stack-md flex items-center gap-stack-sm p-stack-sm bg-error-container border border-error rounded-lg">
      <span className="material-symbols-outlined text-error text-[20px]">error</span>
      <p className="font-body-sm text-body-sm text-on-error-container">{message}</p>
    </div>
  );
}